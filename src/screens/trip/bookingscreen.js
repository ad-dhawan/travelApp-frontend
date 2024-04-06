import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { deleteBookingDetails, getBookingDetails } from '../../redux/trips/tripActions';
import { tripSlice } from '../../redux/trips/tripSlice';

//COMPONENTS
import Header from '../../components/header';
import Loading from '../../components/loading';
import AppButton from '../../components/button';
import AppTextInput from '../../components/textinput';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './style';
import { PRIMARY_BRAND_1, PRIMARY_BRAND_2, TEXT } from '../../utils/colors';

//CONSTANTS
const FILE_NAME = 'documentscreen.js'

const Bookings = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [newBooking, setNewBooking] = useState({});

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('bookingDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.bookingDetails && state.bookingDetails.length !== 0) {
            setBookingDetails(state.bookingDetails[0].bookings);
            setLoading(false);
        } else {
            dispatch(getBookingDetails({ tripId }));
        }
    }, [state.bookingDetails]);

    const onPressDeleteDocument = (bookingId) => {
        const updatedBookingDetails = bookingDetails.filter(booking => booking._id !== bookingId);
        setBookingDetails(updatedBookingDetails);

        dispatch(deleteBookingDetails({
            bookingId: bookingId,
            tripId: tripId,
        }))
    };

    const renderBooking = ({ item, index }) => {
        return (
            <>
                <View style={[styles.bookingContainer]}>

                    <View style={styles.addressContainer} >
                        <View>
                            <Text style={styles.bookingTitle} >{item.title}</Text>
                            <Text style={styles.bookingAddress} >{item.address}</Text>
                        </View>

                        <TouchableOpacity onPress={() => onPressDeleteDocument(item._id)} >
                            <MaterialCommunityIcons name={'delete'} size={20} color={TEXT} />
                        </TouchableOpacity>
                    </View>

                    <View style={ styles.bookingNumberContainer } >
                        <Text style={styles.bookingHeading} >Booking Number</Text>
                        <Text style={styles.bookingDetail} >{item.booking_number}</Text>
                    </View>

                    <View style={styles.bookingDateContainer} >
                        <View>
                            <Text style={styles.bookingHeading} >Check-in</Text>
                            <Text style={styles.bookingDetail} >{moment.unix(item.checkin_date).format('DD MMM YYYY')}</Text>
                            <Text style={styles.bookingDetail} >{moment.unix(item.checkin_date).format('hh:mm A')}</Text>
                        </View>

                        <View>
                            <Text style={styles.bookingHeading} >Check-out</Text>
                            <Text style={styles.bookingDetail} >{moment.unix(item.checkout_date).format('DD MMM YYYY')}</Text>
                            <Text style={styles.bookingDetail} >{moment.unix(item.checkout_date).format('hh:mm A')}</Text>
                        </View>
                    </View>

                </View>
                {/* <View style={styles.divider} /> */}
            </>
        );
    };

    const onPressCancel = () => {
        setNewBooking('');
        bottomSheetRef.current.close();
    }

    const addNewTodo = () => {
        // dispatch(createNoteDetails({
        //     note: newBooking,
        //     tripId: tripId
        // }));

        setNewBooking('');
        bottomSheetRef.current.close();
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'Bookings'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={bookingDetails}
                    renderItem={renderBooking}
                    keyExtractor={(item) => item._id}
                />
            </ScrollView>

            <TouchableOpacity
                onPress={() => bottomSheetRef.current.open()}
                style={styles.addButton}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
                <AntDesign name={'pluscircle'} size={45} color={PRIMARY_BRAND_2} />
            </TouchableOpacity>

            <RBSheet
                ref={bottomSheetRef}
                height={300}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20
                    },
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppTextInput
                        placeholder="Title"
                        value={newBooking.title}
                        onChangeText={text => setNewBooking(prevState => ({...prevState, title: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <AppTextInput
                        placeholder="Address"
                        value={newBooking.address}
                        onChangeText={text => setNewBooking(prevState => ({...prevState, address: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <AppTextInput
                        placeholder="Booking Number"
                        value={newBooking.bookingNumber}
                        onChangeText={text => setNewBooking(prevState => ({...prevState, bookingNumber: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <AppTextInput
                            placeholder="Check-in"
                            value={newBooking.checkinDate}
                            onChangeText={text => setNewBooking(prevState => ({...prevState, checkinDate: text}))}
                            customStyle={{marginBottom: 10, textAlignVertical : 'top', flex: 0.5}}
                        />
                        <AppTextInput
                            placeholder="Check-out"
                            value={newBooking.checkoutDate}
                            onChangeText={text => setNewBooking(prevState => ({...prevState, checkoutDate: text}))}
                            customStyle={{marginBottom: 10, textAlignVertical : 'top', flex: 0.5}}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <AppButton text={'Cancel'} onPress={onPressCancel} />
                        <AppButton text={'Done'} onPress={addNewTodo} />
                    </View>
                </View>
            </RBSheet>
        </>
    );
};

export default Bookings;
