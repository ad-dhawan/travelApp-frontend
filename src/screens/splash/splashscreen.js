import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//FUNCTIONS
import { getUser } from '../../redux/auth/authActions';

//COMPOENNTS
import Loading from '../../components/loading';

const Splash = ({navigation}) => {
    const state = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    useEffect(() => {
        if(state.userInfo){
            dispatch(getUser());
            navigation.replace('upcomingTrips');
        } else {
            navigation.replace('login');
        }
    }, []);

    return(
        <>
            <Loading />
        </>
    )
};

export default Splash;