import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';

//FUNCTIONS
import { tripSlice } from '../../redux/trips/tripSlice';
import { getTripDetails } from '../../redux/trips/tripActions';

//COMPONENTS
import Loading from '../../components/loading';

import Feather from 'react-native-vector-icons/Feather';

import styles from './style';
import { TEXT_WHITE } from '../../utils/colors';

//CONSTANTS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/values';

const FILE_NAME = 'upcomingtripscreen.js';

const UpcomingTrips = ({navigation}) => {
    const state = useSelector((state) => state.trip);

    const [loading, setLoading] = useState(true);
    const [tripDetails, setTripDetails] = useState();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const { resetError, resetState } = tripSlice.actions;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetState());
    }, []);

    useEffect(() => {
        if (state.tripDetails.length !== 0) {
            // Find the trip with the smallest start_date
            const smallestStartDateTrip = state.tripDetails.reduce(
                (min, trip) => (trip.start_date < min.start_date ? trip : min),
                state.tripDetails[0]
            );

            setTripDetails(smallestStartDateTrip);
            setLoading(false);
        } else {
            dispatch(getTripDetails());
        }
    }, [state.tripDetails]);

    useEffect(() => {
        if (tripDetails) {
            const countdown = setInterval(() => {
                const now = moment();
                const startDate = moment.unix(tripDetails.start_date);
                const diff = startDate.diff(now);
                const duration = moment.duration(diff);

                setTimeLeft({
                    days: duration.days(),
                    hours: duration.hours(),
                    minutes: duration.minutes(),
                    seconds: duration.seconds(),
                });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [tripDetails]);

    const onPressItem = (mode) => {
        switch(mode){
            case 'itinerary': 
                navigation.push('itinerary', {tripId: tripDetails._id});
                break;

            case 'todo':
                navigation.navigate('todo', {tripId: tripDetails._id});
                break;
            
            case 'notes':
                navigation.push('notes', {tripId: tripDetails._id});
                break;

            case 'documents':
                navigation.push('documents', {tripId: tripDetails._id});
                break;

            case 'list':
                navigation.push('packingList', {tripId: tripDetails._id});
                break;

            case 'stay':
                navigation.push('bookings', {tripId: tripDetails._id});
                break;

            case 'transport':
                navigation.push('transport', {tripId: tripDetails._id});
                break;

            case 'myTrips':
                navigation.push('myTrips');
                break;

            default:
                return null;
        }
    }

    if (loading) return <Loading />;

    return (
        <>
            <View>
                <ImageBackground style={styles.headerFooter}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.tripTitle} >{tripDetails.title}</Text>

                        {timeLeft.days !== 0 && timeLeft.hours !== 0 && timeLeft.minutes !== 0 && timeLeft.seconds !== 0 && (
                            <View style={styles.timeLeftContainer} >
                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.days}</Text>
                                    <Text style={styles.timeLeftText} >Days</Text>
                                </View>

                                {/* <Text style={{marginTop: 10, alignSelf: 'flex-start', fontWeight: 'bold'}} >:</Text> */}

                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.hours}</Text>
                                    <Text style={styles.timeLeftText} >Hours</Text>
                                </View>

                                {/* <Text style={{marginTop: 10, alignSelf: 'flex-start', fontWeight: 'bold'}} >:</Text> */}

                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.minutes}</Text>
                                    <Text style={styles.timeLeftText} >Minutes</Text>
                                </View>

                                {/* <Text style={{marginTop: 10, alignSelf: 'flex-start', fontWeight: 'bold'}} >:</Text> */}

                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.seconds}</Text>
                                    <Text style={styles.timeLeftText} >Seconds</Text>
                                </View>
                            </View>
                        )}

                        <LottieView
                            style={styles.upcomingAnimation}
                            source={require('../../assets/animations/upcoming.json')}
                            autoPlay
                            loop
                        />
                    </View>

                    <TouchableOpacity onPress={() => onPressItem('itinerary')} style={styles.viewItineraryContainer} >
                        <Text style={styles.viewItineraryText} >View your Itinerary</Text>
                        <Feather name={"arrow-right"} size={20} color={TEXT_WHITE} />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.otherItemsParentContainer} >
                    <TouchableOpacity onPress={() => onPressItem('todo')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/todo.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >ToDo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPressItem('notes')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/notes.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPressItem('list')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/list.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Packing List</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.otherItemsParentContainer} >
                    <TouchableOpacity onPress={() => onPressItem('documents')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/documents.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Documents</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => onPressItem('stay')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/stay.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Stay</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => onPressItem('transport')} style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/transport.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Transport</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};

export default UpcomingTrips;
