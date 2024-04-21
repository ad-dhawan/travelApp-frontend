import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';

//FUNCTIONS
import { tripSlice } from '../../redux/trips/tripSlice';
import { deleteTripDetails, editTripDetails } from '../../redux/trips/tripActions';

//COMPONENTS
import Loading from '../../components/loading';
import OnboardingScreen from '../../components/onboarding';
import AppTextInput from '../../components/textinput';
import AppDateTimePicker from '../../components/datetimepicker';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import { ERROR, PLACEHOLDER_COLOR, TEXT, TEXTINPUT_UNFOCUSED, TEXT_WHITE } from '../../utils/colors';

//CONSTANTS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/values';
import Header from '../../components/header';
import AppButton from '../../components/button';

const FILE_NAME = 'edittrip.js';

const EditTrip = ({navigation}) => {
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { tripDetails } = navigation.state.params;

    const { resetError, resetState } = tripSlice.actions;

    const [loading, setLoading] = useState(true);
    const [newTrip, setNewTrip] = useState(tripDetails);

    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);


    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        console.log("trip details: ", tripDetails)
        dispatch(resetError());

        setLoading(false);
    }, []);

    useEffect(() => {
        if(state.success){
            console.log("trip edited");
            navigation.goBack();
        } else {
            console.log('trip not edited, try again');
        }
    }, [state.success])

    const showStartDatePicker = () => {
        setIsStartDatePickerVisible(true);
    };
    
    const hideStartDatePicker = () => {
        setIsStartDatePickerVisible(false);
    };
    
    const handleStartDatePicked = (date) => {
        setNewTrip(prevState => ({...prevState, start_date: moment(date).unix()}));
        hideStartDatePicker();
    };
    
    const showEndDatePicker = () => {
        setIsEndDatePickerVisible(true);
    };
    
    const hideEndDatePicker = () => {
        setIsEndDatePickerVisible(false);
    };
    
    const handleEndDatePicked = (date) => {
        setNewTrip(prevState => ({...prevState, end_date: moment(date).unix()}));
        hideEndDatePicker();
    };

    const onPressPickImage = () => {
        setLoading(true);

        ImagePicker.openPicker({
          includeBase64: true,
        //   compressImageQuality: 0.8,
          cropping: true,
          mediaType: 'photo'
        })
          .then((image) => {
            var imageProperties = {
              imageData: image.data,
              imageType: image.mime,
              imagePath: image.path,
              name: image.path.split('/').pop(),
            };
            console.log('File picked: ', imageProperties);
            setNewTrip(prevState => ({...prevState, cover_image: imageProperties.imageData}));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }

    const onPressCancel = () => {
        setNewTrip('');
        navigation.goBack();
    };

    const editTrip = () => {
        if(newTrip.title && newTrip.start_date && newTrip.end_date){
            const data = {
                tripId: newTrip._id,
                title: newTrip.title,
                description: newTrip.description,
                startDate: newTrip.start_date,
                endDate: newTrip.end_date,
                image: newTrip.cover_image
            };

            dispatch(editTripDetails(data));
        } else {
            if(!newTrip.title) console.log('title not found');
            else if(!newTrip.start_date) console.log('start date not found');
            else if(!newTrip.end_date) console.log('end date not found');
        }
    };

    const onPressDeleteTrip = () => {
        dispatch(deleteTripDetails({tripId: newTrip._id}));
    }

    if (loading) return <Loading />;

    return(
        <>
            <Header navigation={navigation} title={'Create new trip'} />

            <View style={styles.createTripParentContainer} >

                <AppTextInput
                    placeholder="Title"
                    value={newTrip.title}
                    onChangeText={text => setNewTrip(prevState => ({...prevState, title: text}))}
                    customStyle={styles.createTripTextInput}
                />

                <AppTextInput
                    placeholder="Description"
                    value={newTrip.description}
                    onChangeText={text => setNewTrip(prevState => ({...prevState, description: text}))}
                    customStyle={styles.createTripTextInput}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={showStartDatePicker} style={{ flex: 0.45 }} >
                        <AppTextInput
                            placeholder="Start Date"
                            value={moment.unix(newTrip.start_date).format('DD MMM YYYY')}
                            customStyle={styles.createTripTextInput}
                            editable={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showEndDatePicker} style={{ flex: 0.45 }} >
                        <AppTextInput
                            placeholder="End Date"
                            value={moment.unix(newTrip.end_date).format('DD MMM YYYY')}
                            customStyle={styles.createTripTextInput}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onPressPickImage} style={[styles.createTripImagePickContainer, {paddingVertical: newTrip.cover_image ? 0 : 40}]} >
                    {newTrip.cover_image ? (
                        <Image source={{ uri: `data:image/png;base64,${newTrip.cover_image}` }} style={styles.createTripImage} />
                    ) : (
                        <>
                            <FontAwesome6 name={'mountain-sun'} size={25} color={TEXTINPUT_UNFOCUSED} />
                            <Text style={styles.createTripCoverImageText} >Choose cover image</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
                    <AppButton text={'Cancel'} onPress={onPressCancel} />
                    <AppButton text={'Done'} onPress={editTrip} />
                </View>

            </View>

            <TouchableOpacity onPress={onPressDeleteTrip} style={styles.deleteTripContainer} >
                <MaterialIcons name={'delete'} size={20} color={ERROR}  />
                <Text style={styles.deleteTripText} >Delete this trip</Text>
            </TouchableOpacity>

            <AppDateTimePicker
                isEwDateTimePickerVisible={isStartDatePickerVisible}
                modeEwDateTimePicker="date"
                _hideEwDateTimePicker={hideStartDatePicker}
                _handleEwDateTimePicked={handleStartDatePicked}
                elementKey="startDatePicker"
                setDateTimePicker={moment.unix(newTrip.start_date).toDate()}
                // setDateTimePicker={newTrip.start_date ? moment(newTrip.start_date, "DD MMM YYYY").toDate() : new Date()} // Set to current time or default time
                set24TimeFormat={true}
            />

            <AppDateTimePicker
                isEwDateTimePickerVisible={isEndDatePickerVisible}
                modeEwDateTimePicker="date"
                _hideEwDateTimePicker={hideEndDatePicker}
                _handleEwDateTimePicked={handleEndDatePicked}
                elementKey="endDatePicker"
                setDateTimePicker={moment.unix(newTrip.end_date).toDate()}
                set24TimeFormat={true}
            />
        </>
    )
};

export default EditTrip;