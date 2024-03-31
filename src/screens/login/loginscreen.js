import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//functions
import { googlesignin, emailsignin } from '../../redux/auth/authActions';
import { authSlice } from '../../redux/auth/authSlice';

//components
import AppTextInput from '../../components/textinput';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

//style
import styles from './style'
import { TEXTINPUT_ICON, TEXT, BACKGROUND_OVERLAY, BACKGROUND, TEXT_WHITE, PLACEHOLDER_COLOR } from '../../utils/colors';

const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.authentication);
    const { resetError } = authSlice.actions

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    useEffect(() => {
        dispatch(resetError());
    }, [])

    useEffect(() => {
        if(state.success) navigation.replace('dashboard')
    }, [state.success])

    const onPressGoogle = () => {
        console.log('In onPressGoogle');

        dispatch(googlesignin());
    }

    const onPressLogin = () => {
        console.log('In onPressLogin');

        dispatch(emailsignin({
            email,
            password
        }));
    }

    return(
        <>
            <View style={styles.parentContainer} >
                <ImageBackground source={require('../../assets/login-bg.png')} resizeMode="cover" style={styles.bgImage} >
                    <ImageBackground style={styles.bgOverlay} >

                        <View style={styles.itemsContainer} >

                            <Text style={styles.titleText} >Create your own Travel Diary</Text>

                            <AppTextInput
                                placeholder="Enter username"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                customStyle={{ marginTop: 30, borderColor: BACKGROUND }}
                                customTextStyle={{ color: TEXT_WHITE }}
                                placeholderColor={TEXT_WHITE}
                                leftIcon={<Entypo name="lock" size={20} color={TEXTINPUT_ICON} />}
                            />

                            <AppTextInput
                                placeholder="Enter password"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                customStyle={{ marginTop: 10, borderColor: BACKGROUND }}
                                customTextStyle={{ color: TEXT_WHITE }}
                                placeholderColor={TEXT_WHITE}
                                secureText={hidePassword}
                                leftIcon={<Entypo name="lock" size={20} color={TEXTINPUT_ICON} />}
                                rightIcon={<Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={20} color={TEXT} />}
                                onPressRightIcon={() => setHidePassword(!hidePassword)}
                            />

                            <TouchableOpacity onPress={onPressLogin} style={styles.googleContainer} >
                                <Text style={styles.signinText} >Sign in</Text>
                            </TouchableOpacity>

                            <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center' }} >
                                <View style={{ borderColor: TEXT_WHITE, borderWidth: .2, flex: 1 }} />
                                <Text style={{ marginHorizontal: 10, color: TEXT_WHITE }} >or continue with</Text>
                                <View style={{ borderColor: TEXT_WHITE, borderWidth: .2, flex: 1 }} />
                            </View>

                            <TouchableOpacity onPress={onPressGoogle} style={styles.googleContainer} >
                                <AntDesign name="google" color={TEXT} />
                                <Text style={styles.signinText} >Google</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </ImageBackground>
            </View>
        </>
    )
};

export default Login;