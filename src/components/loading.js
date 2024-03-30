import React from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/values';

import EwAnimatedLogo from './animtedlogo';

const Loading = () => {
    return(
        <>
            <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff50', width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} >
                <EwAnimatedLogo scale={1} />
            </View>
        </>
    )
};

export default Loading;