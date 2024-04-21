import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';

//FUNCTIONS
import { tripSlice } from '../../redux/trips/tripSlice';
import { createNewTrip } from '../../redux/trips/tripActions';

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

const FILE_NAME = 'createtrip.js';

const CreateTrip = ({navigation}) => {
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();

    const { resetError, resetState } = tripSlice.actions;

    const [loading, setLoading] = useState(true);
    const [newTrip, setNewTrip] = useState('');

    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);


    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetError());

        setLoading(false);
    }, []);

    useEffect(() => {
        if(state.success){
            console.log("trip created");
            navigation.goBack();
        } else {
            console.log('trip not created, try again');
        }
    }, [state.success])

    const showStartDatePicker = () => {
        setIsStartDatePickerVisible(true);
    };
    
    const hideStartDatePicker = () => {
        setIsStartDatePickerVisible(false);
    };
    
    const handleStartDatePicked = (time) => {
        setNewTrip(prevState => ({...prevState, startDate: moment(time).format('DD MMM YYYY')}));
        hideStartDatePicker();
    };
    
    const showEndDatePicker = () => {
        setIsEndDatePickerVisible(true);
    };
    
    const hideEndDatePicker = () => {
        setIsEndDatePickerVisible(false);
    };
    
    const handleEndDatePicked = (time) => {
        setNewTrip(prevState => ({...prevState, endDate: moment(time).format('DD MMM YYYY')}));
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
            setNewTrip(prevState => ({...prevState, image: imageProperties.imageData}));
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

    const addNewTrip = () => {
        if(newTrip.title && newTrip.startDate && newTrip.endDate){
            const data = {
                title: newTrip.title,
                description: newTrip.description,
                startDate: moment(newTrip.startDate, "DD MMM YYYY").unix(),
                endDate: moment(newTrip.endDate, "DD MMM YYYY").unix(),
                image: newTrip.image
            };

            dispatch(createNewTrip(data));
        } else {
            if(!newTrip.title) console.log('title not found');
            else if(!newTrip.startDate) console.log('start date not found');
            else if(!newTrip.endDate) console.log('end date not found');
        }
    };

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
                            value={newTrip.startDate}
                            customStyle={styles.createTripTextInput}
                            editable={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showEndDatePicker} style={{ flex: 0.45 }} >
                        <AppTextInput
                            placeholder="End Date"
                            value={newTrip.endDate}
                            customStyle={styles.createTripTextInput}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onPressPickImage} style={[styles.createTripImagePickContainer, {paddingVertical: newTrip.image ? 0 : 40}]} >
                    {newTrip.image ? (
                        <Image source={{ uri: `data:image/png;base64,${newTrip.image}` }} style={styles.createTripImage} />
                    ) : (
                        <>
                            <FontAwesome6 name={'mountain-sun'} size={25} color={TEXTINPUT_UNFOCUSED} />
                            <Text style={styles.createTripCoverImageText} >Choose cover image</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
                    <AppButton text={'Discard'} onPress={onPressCancel} />
                    <AppButton text={'Create'} onPress={addNewTrip} />
                </View>

            </View>

            <AppDateTimePicker
                isEwDateTimePickerVisible={isStartDatePickerVisible}
                modeEwDateTimePicker="date"
                _hideEwDateTimePicker={hideStartDatePicker}
                _handleEwDateTimePicked={handleStartDatePicked}
                elementKey="startDatePicker"
                setDateTimePicker={new Date()} // Set to current time or default time
                set24TimeFormat={true}
            />

            <AppDateTimePicker
                isEwDateTimePickerVisible={isEndDatePickerVisible}
                modeEwDateTimePicker="date"
                _hideEwDateTimePicker={hideEndDatePicker}
                _handleEwDateTimePicked={handleEndDatePicked}
                elementKey="endDatePicker"
                setDateTimePicker={newTrip.startDate ? moment(newTrip.startDate, "DD MMM YYYY").toDate() : new Date()} // Set to current time or default time
                set24TimeFormat={true}
            />
        </>
    )
};

export default CreateTrip;