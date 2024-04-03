import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * <AppButton
        text={'Login'}
        onPress={() => console.log('button pressed')}
        customStyle={{ marginTop: 50 }}
        customTextStyle={{ color: '#ffffff }}
    />
 */

/**
 * CONSTANTS
 */
import { PRIMARY_BRAND_2, TEXT_WHITE } from '../utils/colors'

const AppButton = ({text, onPress, customStyle, customTextStyle}) => {
    return(
        <>
            <TouchableOpacity onPress={onPress} style={[ styles.container, customStyle ]} activeOpacity={0.9} >
                <Text style={[ styles.buttonText, customTextStyle ]} >{text}</Text>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_BRAND_2,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 14,
        fontWeight: '500',
        color: TEXT_WHITE,
        textTransform: 'uppercase'
    }
});

export default AppButton;