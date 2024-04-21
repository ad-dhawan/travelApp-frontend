import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';

// FUNCTIONS
import { getTodoDetails, editTodoDetails, deleteTodoDetails, createTodoDetails, getItineraryDetails } from '../../redux/trips/tripActions';
import { tripSlice } from '../../redux/trips/tripSlice';

// COMPONENTS
import Header from '../../components/header';
import Loading from '../../components/loading';
import AppButton from '../../components/button';
import AppTextInput from '../../components/textinput';
import AppDateTimePicker from '../../components/datetimepicker';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PRIMARY_BRAND_1, PRIMARY_BRAND_2, TEXT } from '../../utils/colors';
import styles from './style';

// CONSTANTS
const FILE_NAME = 'itineraryscreen.js'

const Itinerary = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;

    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [itineraryDetails, setItineraryDetails] = useState([]);
    const [newItinerary, setNewItinerary] = useState('');
    const [selectedTab, setSelectedTab] = useState('');

    const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('itineraryDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.itineraryDetails) {
            setItineraryDetails(state.itineraryDetails[0]?.list);
            setLoading(false);
        } else {
            dispatch(getItineraryDetails({ tripId }));
        }
    }, [state.itineraryDetails]);

    useEffect(() => {
        // Set the default selected tab after itineraryDetails has been populated
        if (itineraryDetails.length !== 0) {
            setSelectedTab(itineraryDetails[0]._id);
        }
    }, [itineraryDetails]);

    const renderTab = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.itineraryDateTab, selectedTab === item._id && styles.itineraryDateSelectedTab]}
            onPress={() => setSelectedTab(item._id)}
        >
            <Text style={styles.itineraryDayText}>Day</Text>
            {/* <Text style={styles.itineraryDayNumberText}>{moment.unix(item.date).format('DD')}</Text> */}
            <Text style={styles.itineraryDayNumberText}>{index}</Text>
        </TouchableOpacity>
    );

    const RenderItineraryData = (data) => {
        console.log("data is: ", data)
        const itineraryData = data.data
        console.log(itineraryData);

        if(itineraryData.length === 0) return(
            <>
                <View style={styles.noItineraryContainer} >
                    <Image style={styles.noItineraryImage} source={require('../../assets/no-itinerary.png')} />
                    <Text style={styles.noItineraryHeading} >No Itinerary Yet</Text>
                    <Text style={styles.noItineraryText} >Click the add button below to add a new itinerary to this day</Text>
                </View>
            </>
        )

        return(
            <>
                {itineraryData.map(item => (
                    <View style={styles.parentContainer} >
                        <Image source={{ uri: item.thumbnail }} style={styles.itineraryThumbnail} />

                        <View style={styles.itineraryDetailsContainer} >

                            <View>
                                <Text style={styles.itineraryTitle} >{item.title}</Text>
                                <Text style={styles.itineraryTime} >
                                    {item.start_time && moment.unix(item.start_time).format('hh:mm A')}
                                    {item.end_time && ' - '}
                                    {item.end_time && moment.unix(item.end_time).format('hh:mm A')}
                                </Text>
                            </View>

                            <Text style={styles.itineraryDescription} >{item.description || "Add Description"}</Text>

                        </View>
                    </View>
                ))}
            </>
        )
    }

    const showStartTimePicker = () => {
        setIsStartTimePickerVisible(true);
    };
    
    const hideStartTimePicker = () => {
        setIsStartTimePickerVisible(false);
    };
    
    const handleStartTimePicked = (time) => {
        setNewItinerary(prevState => ({...prevState, startTime: moment(time).format('hh:mm A')}));
        hideStartTimePicker();
    };
    
    const showEndTimePicker = () => {
        setIsEndTimePickerVisible(true);
    };
    
    const hideEndTimePicker = () => {
        setIsEndTimePickerVisible(false);
    };
    
    const handleEndTimePicked = (time) => {
        setNewItinerary(prevState => ({...prevState, endTime: moment(time).format('hh:mm A')}));
        hideEndTimePicker();
    };
    

    const onPressCancel = () => {
        setNewItinerary('');
        bottomSheetRef.current.close();
    }

    const addNewItinerary = () => {
        // dispatch(createNoteDetails({
        //     note: newBooking,
        //     tripId: tripId
        // }));

        setNewItinerary('');
        bottomSheetRef.current.close();
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'Itinerary'} />
            <View>
                <FlatList
                    horizontal
                    data={itineraryDetails}
                    renderItem={renderTab}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.tabContainer}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }} >
                {itineraryDetails.map(item => {
                    if(selectedTab === item._id) return <RenderItineraryData data={item.data} />
                })}
            </ScrollView>

            <TouchableOpacity
                onPress={() => bottomSheetRef.current.open()}
                style={styles.addButton}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
                <AntDesign name={'pluscircle'} size={45} color={PRIMARY_BRAND_2} />
            </TouchableOpacity>

            <RBSheet
                ref={bottomSheetRef}
                height={500}
                closeOnDragDown={true}
                onClose={() => setNewItinerary('')}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20
                    },
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppTextInput
                        placeholder="Title"
                        value={newItinerary.title}
                        onChangeText={text => setNewItinerary(prevState => ({...prevState, title: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <AppTextInput
                        placeholder="Description"
                        value={newItinerary.description}
                        onChangeText={text => setNewItinerary(prevState => ({...prevState, description: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <AppTextInput
                        placeholder="Address"
                        value={newItinerary.address}
                        onChangeText={text => setNewItinerary(prevState => ({...prevState, address: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={showStartTimePicker} style={{ flex: 0.5 }} >
                            <AppTextInput
                                placeholder="Start Time"
                                value={newItinerary.startTime}
                                customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showEndTimePicker} style={{ flex: 0.5 }} >
                            <AppTextInput
                                placeholder="End Time"
                                value={newItinerary.endTime}
                                customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <AppButton text={'Cancel'} onPress={onPressCancel} />
                        <AppButton text={'Done'} onPress={addNewItinerary} />
                    </View>
                </View>
            </RBSheet>

            <AppDateTimePicker
                isEwDateTimePickerVisible={isStartTimePickerVisible}
                modeEwDateTimePicker="time"
                _hideEwDateTimePicker={hideStartTimePicker}
                _handleEwDateTimePicked={handleStartTimePicked}
                elementKey="startTimePicker"
                setDateTimePicker={new Date()} // Set to current time or default time
                set24TimeFormat={true}
            />

            <AppDateTimePicker
                isEwDateTimePickerVisible={isEndTimePickerVisible}
                modeEwDateTimePicker="time"
                _hideEwDateTimePicker={hideEndTimePicker}
                _handleEwDateTimePicked={handleEndTimePicked}
                elementKey="endTimePicker"
                setDateTimePicker={new Date()} // Set to current time or default time
                set24TimeFormat={true}
            />
        </>
    );
};

export default Itinerary;
