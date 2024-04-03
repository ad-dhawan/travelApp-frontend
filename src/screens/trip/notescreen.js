import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { getNoteDetails } from '../../redux/trips/tripActions';
import { tripSlice } from '../../redux/trips/tripSlice';

//COMPONENTS
import Header from '../../components/header';
import Loading from '../../components/loading';
import AppButton from '../../components/button';
import AppTextInput from '../../components/textinput';

import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './style';
import { PRIMARY_BRAND_1, PRIMARY_BRAND_2 } from '../../utils/colors';

//CONSTANTS
const FILE_NAME = 'notescreen.js'

const Notes = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [noteDetails, setNoteDetails] = useState([]);
    const [newTodoTask, setNewTodoTask] = useState('');

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetError());
    }, []);

    useEffect(() => {
        console.log("notes are: ", state.noteDetails[0].notes);
        if (state.noteDetails && state.noteDetails.length !== 0) {
            setNoteDetails(state.noteDetails[0].notes);
            setLoading(false);
        } else {
            dispatch(getNoteDetails({ tripId }));
        }
    }, [state.noteDetails]);

    const renderTodoItem = ({ item, index }) => {
        return (
            <>
                <View style={[styles.todoContainer, { marginVertical: 10 }]}>
                    <Text style={styles.todoTask} numberOfLines={1} ellipsizeMode="tail">{index+1}. {item.note}</Text>
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
        //add login to add new task 
        setNewTodoTask('');
        bottomSheetRef.current.close();
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'Notes'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={noteDetails}
                    renderItem={renderTodoItem}
                    keyExtractor={(item) => item._id}
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
                height={250}
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
                        placeholder="Type your note..."
                        value={newTodoTask}
                        onChangeText={text => setNewTodoTask(text)}
                        customStyle={{marginBottom: 10, height: 120}}
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

export default Notes;
