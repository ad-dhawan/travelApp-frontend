import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { getTodoDetails, editTodoDetails, deleteTodoDetails, createTodoDetails } from '../../redux/trips/tripActions';
import { tripSlice } from '../../redux/trips/tripSlice';

//COMPONENTS
import Header from '../../components/header';
import Loading from '../../components/loading';
import AppButton from '../../components/button';
import AppTextInput from '../../components/textinput';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './style';
import { PRIMARY_BRAND_1, PRIMARY_BRAND_2, TEXT } from '../../utils/colors';
import emptylistcomponent from './emptylistcomponent';

//CONSTANTS
const FILE_NAME = 'todoscreen.js'

const Todo = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [todoDetails, setTodoDetails] = useState([]);
    const [newTodoTask, setNewTodoTask] = useState('');

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('todoDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.todoDetails) {
            setTodoDetails(state.todoDetails[0]?.todos);
            setLoading(false);
        } else {
            dispatch(getTodoDetails({ tripId }));
        }
    }, [state.todoDetails]);

    const handleCheckboxPress = (index, item) => {
        const updatedTodoDetails = [...todoDetails];
        updatedTodoDetails[index].status = !updatedTodoDetails[index].status;
        setTodoDetails(updatedTodoDetails);

        dispatch(editTodoDetails({
            todoId: item._id,
            tripId: tripId,
            status: updatedTodoDetails[index].status
        }))
    };

    const onPressDeleteTodo = (todoId) => {
        const updatedTodoDetails = todoDetails.filter(todo => todo._id !== todoId);
        setTodoDetails(updatedTodoDetails);

        dispatch(deleteTodoDetails({
            todoId: todoId,
            tripId: tripId,
        }))
    };
    

    const renderTodoItem = ({ item, index }) => {
        return (
            <>
                <View style={styles.todoContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}} >
                        <Checkbox
                            status={item.status ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxPress(index, item)}
                        />
                        <Text style={styles.todoTask} numberOfLines={1} ellipsizeMode="tail">{item.task}</Text>
                    </View>

                    <TouchableOpacity onPress={() => onPressDeleteTodo(item._id)} >
                        <MaterialCommunityIcons name={'delete'} size={20} color={TEXT} />
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
            </>
        );
    };

    const onPressCancel = () => {
        setNewTodoTask('');
        bottomSheetRef.current.close();
    }

    const addNewTodo = () => {
        dispatch(createTodoDetails({
            task: newTodoTask,
            tripId: tripId
        }));

        bottomSheetRef.current.close();
        setNewTodoTask('');
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'ToDo'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={todoDetails}
                    renderItem={renderTodoItem}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={emptylistcomponent}
                />
            </ScrollView>

            <TouchableOpacity
                onPress={() => bottomSheetRef.current.open()}
                style={styles.addButton}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
                <AntDesign name={'pluscircle'} size={45} color={PRIMARY_BRAND_2} />
            </TouchableOpacity>

            <RBSheet
                ref={bottomSheetRef}
                height={200}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20
                    },
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppTextInput
                        placeholder="Enter task..."
                        value={newTodoTask}
                        onChangeText={text => setNewTodoTask(text)}
                        customStyle={{marginBottom: 10}}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <AppButton text={'Cancel'} onPress={onPressCancel} />
                        <AppButton text={'Done'} onPress={addNewTodo} />
                    </View>
                </View>
            </RBSheet>
        </>
    );
};

export default Todo;
