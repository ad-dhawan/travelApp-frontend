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

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './style';
import { TEXT_WHITE } from '../../utils/colors';

//CONSTANTS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/values';

const FILE_NAME = 'upcomingtripscreen.js';

const UpcomingTrips = () => {
    const state = useSelector((state) => state.trip);

    const [loading, setLoading] = useState(true);
    const [tripDetails, setTripDetails] = useState();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const { resetError } = tripSlice.actions;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetError());
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

    const onPressItinerary = () => {
        console.log("View itinerary pressed");
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

                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.hours}</Text>
                                    <Text style={styles.timeLeftText} >Hours</Text>
                                </View>

                                <View style={styles.timeLeftItem} >
                                    <Text style={styles.timeLeft} >{timeLeft.minutes}</Text>
                                    <Text style={styles.timeLeftText} >Minutes</Text>
                                </View>

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

                    <TouchableOpacity onPress={onPressItinerary} style={styles.viewItineraryContainer} >
                        <Text style={styles.viewItineraryText} >View your Itinerary</Text>
                        <AntDesign name={"arrow-right"} size={20} color={TEXT_WHITE} />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.otherItemsParentContainer} >
                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/todo.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >ToDo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/notes.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/list.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Packing List</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.otherItemsParentContainer} >
                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/notes.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Documents</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/todo.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Stay</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.otherItemsContainer} >
                        <Image style={styles.otherItemImage} source={require('../../assets/list.png')} />
                        <Text style={styles.otherItemText} numberOfLines={1} ellipsizeMode="tail" >Transport</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};

export default UpcomingTrips;
