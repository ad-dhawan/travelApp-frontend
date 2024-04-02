import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Splash = ({navigation}) => {
    const state = useSelector((state) => state.authentication);

    useEffect(() => {
        console.log("user info from splash: ", state)
        state.userInfo ? navigation.replace('upcomingTrips') : navigation.replace('login');
    }, []);

    return(
        <>
            <Text>Splash</Text>
        </>
    )
};

export default Splash;