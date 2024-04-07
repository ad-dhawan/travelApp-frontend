import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
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

//CONSTANTS
const FILE_NAME = 'itineraryscreen.js'

const Itinerary = ({navigation}) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [itineraryDetails, setItineraryDetails] = useState([]);
    const [newItinerary, setNewItinerary] = useState('');

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('itineraryDetails'));
        dispatch(resetError());
    }, []);

    // useEffect(() => {
    //     if (state.todoDetails.length !== 0) {
    //         setItineraryDetails(state.itineraryDetails[0].list);
    //         setLoading(false);
    //     } else {
    //         dispatch(getItineraryDetails({ tripId }));
    //     }
    // }, [state.todoDetails]);

    if(loading) return <Loading />

    return(
        <>
            <Header navigation={navigation} title={'Itinerary'} />
        </>
    )
};

export default Itinerary;