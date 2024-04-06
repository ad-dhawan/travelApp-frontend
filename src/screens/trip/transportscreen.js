import React from 'react';
import { View, Text } from 'react-native';

//COMPONENTS
import Header from '../../components/header';

const Transport = ({navigation}) => {
    return(
        <>
            <Header navigation={navigation} title={'Transport'} />
            <Text>Transport</Text>
        </>
    )
};

export default Transport;