import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { getNoteDetails, deleteNoteDetails, createNoteDetails } from '../../redux/trips/tripActions';
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

//CONSTANTS
const FILE_NAME = 'notescreen.js'

const Notes = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [noteDetails, setNoteDetails] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('noteDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.noteDetails && state.noteDetails.length !== 0) {
            setNoteDetails(state.noteDetails[0].notes);
            setLoading(false);
        } else {
            dispatch(getNoteDetails({ tripId }));
        }
    }, [state.noteDetails]);

    const onPressDeleteNote = (noteId) => {
        const updatedNoteDetails = noteDetails.filter(todo => todo._id !== noteId);
        setNoteDetails(updatedNoteDetails);

        dispatch(deleteNoteDetails({
            noteId: noteId,
            tripId: tripId,
        }))
    };

    const renderTodoItem = ({ item, index }) => {
        return (
            <>
                <View style={[styles.todoContainer, { marginVertical: 10 }]}>
                    <Text style={styles.todoTask} numberOfLines={1} ellipsizeMode="tail">{index+1}. {item.note}</Text>

                    <TouchableOpacity onPress={() => onPressDeleteNote(item._id)} >
                        <MaterialCommunityIcons name={'delete'} size={20} color={TEXT} />
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
            </>
        );
    };

    const onPressCancel = () => {
        setNewNote('');
        bottomSheetRef.current.close();
    }

    const addNewTodo = () => {
        dispatch(createNoteDetails({
            note: newNote,
            tripId: tripId
        }));

        setNewNote('');
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
                        value={newNote}
                        onChangeText={text => setNewNote(text)}
                        customStyle={{marginBottom: 10, height: 120, textAlignVertical : 'top'}}
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
