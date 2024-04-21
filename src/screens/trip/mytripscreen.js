import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import moment from 'moment';

//FUNCTIONS
import { tripSlice } from '../../redux/trips/tripSlice';
import { getTripDetails } from '../../redux/trips/tripActions';

//COMPONENTS
import Loading from '../../components/loading';
import OnboardingScreen from '../../components/onboarding';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './style';
import { PRIMARY_BRAND_2, TEXT_WHITE } from '../../utils/colors';

//CONSTANTS
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/values';
import Header from '../../components/header';

const FILE_NAME = 'mytripscreen.js';

const MyTrips = ({navigation}) => {
    const state = useSelector((state) => state.trip);

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState();

    const { resetError, resetState } = tripSlice.actions;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetState());
    }, []);

    useEffect(() => {
        if (state.tripDetails.length !== 0) {
            setTrips(state.tripDetails);
            setLoading(false);
        } else {
            dispatch(getTripDetails());
        }
    }, [state.tripDetails]);

    if (loading) return <Loading />;
    if(trips.length === 0) return <OnboardingScreen />

    const renderTrips = ({ item, index }) => {
        return(
            <>
                <TouchableOpacity onPress={() => navigation.push('upcomingTrips', {tripId: item._id, showHeader: true})} style={styles.pastTripsItemParentContainer} >
                    <Image source={{ uri: `data:image/png;base64,${item.cover_image}` }} style={styles.pastTripsItemImage} />

                    <View style={styles.pastTripsItemDetailsContainer} >
                        <View>
                            <Text style={styles.pastTripsItemTitle} >{item.title}</Text>
                            <Text style={styles.pastTripsItemDescription} >{item.description}</Text>
                        </View>

                        <Text style={styles.pastTripsItemDate} >{moment.unix(item.start_date).format('DD MMM')} - {moment.unix(item.end_date).format('DD MMM YYYY')}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return(
        <>
            {navigation?.state?.params?.showHeader && <Header navigation={navigation} title={'My trips'} />}
            <ScrollView style={styles.pastTripsParentContainer} showsVerticalScrollIndicator={false} >
                <Text style={styles.pastTripsHeading} >Past Trips</Text>

                <FlatList
                    data={trips}
                    renderItem={renderTrips}
                    keyExtractor={(item) => item._id}
                />
            </ScrollView>

            <TouchableOpacity
                onPress={() => navigation.push('createTrip')}
                style={styles.addButton}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
                <AntDesign name={'pluscircle'} size={45} color={PRIMARY_BRAND_2} />
            </TouchableOpacity>
        </>
    )
};

export default MyTrips;