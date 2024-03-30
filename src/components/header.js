import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

/**
 * ICONS
 */
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

/**
 * CONSTANTS
 */
import { BACKGROUND, TEXT } from '../utils/colors';
import { SCREEN_WIDTH } from '../utils/values';

/**
 * FUNCTIONS
 */
import { clearLocalStorage } from '../methods/storage/clearStorage';
import { deleteUserDetails } from '../methods/storage/saveUser';

const Header = ({navigation, backButton, cameraSwitch, onClickCameraSwitch}) => {
    
    const performLogout = async() => {
        // await clearLocalStorage();
        await deleteUserDetails();
        navigation.navigate('Login')
    }
    
    return(
        <>
            <View style={styles.parentContainer} >
                {backButton ? (
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Entypo name="chevron-left" size={50} color={TEXT} />
                    </TouchableOpacity>
                ) : (
                    <Image source={require('../assets/Logo.png')} style={styles.logo} />
                )}

                <View style={{ flexDirection: 'row' }} >
                    {cameraSwitch ? (
                        <TouchableOpacity onPress={onClickCameraSwitch} >
                            <Ionicons name="ios-camera-reverse-outline" size={50} color={TEXT} />
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity onPress={performLogout} style={{marginLeft: 20}} >
                        <Ionicons name="log-out-outline" size={50} color={TEXT} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    parentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: BACKGROUND
    },
    logo: {
        height: 45,
        width: 45,
    }
})

export default Header;