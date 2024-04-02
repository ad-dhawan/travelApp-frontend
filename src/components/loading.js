import React from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/values';
import LottieView from 'lottie-react-native';

const Loading = () => {
    return(
        <>
            <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff50', width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} >
                <LottieView style={{
                        height: 200,
                        width: 200
                    }}
                    source={require('../assets/animations/loading.json')} autoPlay loop
                />
            </View>
        </>
    )
};

export default Loading;