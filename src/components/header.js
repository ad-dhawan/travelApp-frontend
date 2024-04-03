import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * ICONS
 */
import Entypo from 'react-native-vector-icons/Entypo';

/**
 * CONSTANTS
 */
import { BACKGROUND, TEXT } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/values';

const Header = ({navigation, title}) => {
    
    return(
        <>
            <View style={styles.parentContainer} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Entypo name="chevron-left" size={20} color={TEXT} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title} >{title}</Text>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    parentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        left: 10,
    },
    title: {
        fontWeight: 'bold',
        color: TEXT,
        textAlign: 'center',
        fontSize: 18
    },
})


export default Header;