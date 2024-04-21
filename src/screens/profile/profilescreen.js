import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

//FUNCTIONS
import { tripSlice } from '../../redux/trips/tripSlice';
import { authSlice } from '../../redux/auth/authSlice';
import { getUser } from '../../redux/auth/authActions'
import { getTripDetails } from '../../redux/trips/tripActions';

//COMPONENTS
import Loading from '../../components/loading';
import OnboardingScreen from '../../components/onboarding';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import { ERROR, TEXT, TEXT_WHITE } from '../../utils/colors';

//CONSTANTS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/values';
import Header from '../../components/header';

const FILE_NAME = 'profilescreen.js';

const Profile = ({navigation}) => {
    const state = useSelector((state) => state.authentication);
    const tripState = useSelector((state) => state.trip);

    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();

    const { resetError, resetState } = authSlice.actions;
    const { resetError: resetErrorTrip, resetState: resetStateTrips } = tripSlice.actions;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);
    }, []);

    useEffect(() => {
        if (state.userInfo && state.userInfo.length !== 0) {
            setUserDetails(state.userInfo);
            setLoading(false);
        } else {
            dispatch(getUser());
        }
    }, [state.userInfo]);

    const onPressLogout = () => {
        console.log('In onPressLogout')
        dispatch(resetState());
        dispatch(resetStateTrips());
        navigation.replace('login');
    }

    if (loading) return <Loading />;

    // Filter completed and upcoming trips
    const completedTrips = tripState?.tripDetails.filter(trip => moment.unix(trip.end_date).isBefore(moment())).length;
    const upcomingTrips = tripState?.tripDetails.filter(trip => moment.unix(trip.start_date).isAfter(moment())).length;

    return(
        <>
            <Header navigation={navigation} title={'My profile'} />
            <View style={styles.profilePageParentContainer} >

                <View>
                    <Image source={{ uri: userDetails.profile_picture }} style={styles.profileImage} />
                    <View style={styles.editProfileImage} >
                        <MaterialIcons name={'mode-edit'} size={20} color={TEXT}  />
                    </View>
                </View>

                <Text style={styles.userFullName} >{userDetails.full_name}</Text>
                <Text style={styles.username} >@{userDetails.username}</Text>

                <View style={styles.tripsCountParentContainer} >
                    <TouchableOpacity onPress={() => navigation.push('myTrips', {showHeader: true})} style={styles.tripsCountContainer} >
                        <Text style={styles.tripsCount} >{completedTrips}</Text>
                        <Text style={styles.tripsCountText} >Trips completed</Text>
                    </TouchableOpacity>

                    <View style={styles.tripsCountContainer} >
                        <Text style={styles.tripsCount} >{upcomingTrips}</Text>
                        <Text style={styles.tripsCountText} >Upcoming trips</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.push('createTrip')} >
                    <Text style={styles.createNewTripText} >+ Create new trip</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.logoutParentContainer} >
                <TouchableOpacity onPress={onPressLogout} style={styles.logoutContainer} >
                    <MaterialIcons name={'logout'} size={25} color={ERROR}  />
                    <Text style={styles.logoutText} >Logout</Text>
                </TouchableOpacity>
                <Text style={styles.appVersionText} >v{DeviceInfo.getVersion()}</Text>
            </View>
        </>
    )
};

export default Profile;