import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = ({navigation}) => {
    const state = useSelector((state) => state.authentication);

    return(
        <>
            <Text>{state.userInfo.full_name}</Text>
        </>
    )
};

export default Dashboard;