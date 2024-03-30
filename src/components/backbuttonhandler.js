import React, { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

const BackButtonHandler = ({action, navigation}) => {
  const backPressCountRef = useRef(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    console.log(action, navigation)
    if (action === 'back') {
      navigation.goBack();
      return true;
    }

    if (backPressCountRef.current === 0) {
      ToastAndroid.show('Click again to exit the app', ToastAndroid.SHORT);
      backPressCountRef.current += 1;
      return true; // Prevent default back button behavior
    }

    // Exit the application
    BackHandler.exitApp();
    return true; // Prevent default back button behavior
  };

  return null; // Render nothing, as this component only handles back button actions
};

export default BackButtonHandler;
