import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserDetails = async (object) => {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem('user', jsonValue);
    console.log('User stored successfully in local storage.', jsonValue);
    return true;
  } catch (error) {
    console.log('Error storing User in local storage:', error);
    return false;
  }
};

export const getUserDetails = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    const userDetails = jsonValue ? JSON.parse(jsonValue) : null;
    return userDetails;
  } catch (error) {
    console.log('Error retrieving User from local storage:', error);
    return null;
  }
};