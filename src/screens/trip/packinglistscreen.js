import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { getPackingListDetails, deleteListItemDetails, editListItemDetails, createPackingListDetails } from '../../redux/trips/tripActions';
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
import emptylistcomponent from './emptylistcomponent';

//CONSTANTS
const FILE_NAME = 'packinglistscreen.js'

const PackingList = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [listDetails, setListDetails] = useState([]);
    const [newListItem, setNewListItem] = useState('');

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('listDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.listDetails) {
            setListDetails(state.listDetails[0]?.list);
            setLoading(false);
        } else {
            dispatch(getPackingListDetails({ tripId }));
        }
    }, [state.listDetails]);

    const handleCheckboxPress = (index, item) => {
        const updatedListDetails = [...listDetails];
        updatedListDetails[index].status = !updatedListDetails[index].status;
        setListDetails(updatedListDetails);

        dispatch(editListItemDetails({
            itemId: item._id,
            tripId: tripId,
            status: updatedListDetails[index].status
        }))
    };

    const onPressDeleteItem = (itemId) => {
        const updatedItemDetails = listDetails.filter(item => item._id !== itemId);
        setListDetails(updatedItemDetails);

        dispatch(deleteListItemDetails({
            itemId: itemId,
            tripId: tripId,
        }))
    };

    const renderListItem = ({ item, index }) => {
        return (
            <>
                <View style={styles.todoContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}} >
                        <Checkbox
                            status={item.status ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxPress(index, item)}
                        />
                        <Text style={styles.todoTask} numberOfLines={1} ellipsizeMode="tail">{item.item_name}</Text>
                    </View>

                    <TouchableOpacity onPress={() => onPressDeleteItem(item._id)} >
                        <MaterialCommunityIcons name={'delete'} size={20} color={TEXT} />
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />
            </>
        );
    };

    const onPressCancel = () => {
        setNewListItem('');
        bottomSheetRef.current.close();
    }

    const addNewItem = () => {
        dispatch(createPackingListDetails({
            itemName: newListItem,
            tripId: tripId
        }));

        setNewListItem('');
        bottomSheetRef.current.close();
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'Packing List'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={listDetails}
                    renderItem={renderListItem}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={emptylistcomponent}
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
                height={200}
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
                        placeholder="Enter List item..."
                        value={newListItem}
                        onChangeText={text => setNewListItem(text)}
                        customStyle={{marginBottom: 10}}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <AppButton text={'Cancel'} onPress={onPressCancel} />
                        <AppButton text={'Done'} onPress={addNewItem} />
                    </View>
                </View>
            </RBSheet>
        </>
    );
};

export default PackingList;
