import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

//FUNCTIONS
import { getDocumentDetails, deleteDocumentDetails, createDocumentDetails } from '../../redux/trips/tripActions';
import { tripSlice } from '../../redux/trips/tripSlice';
import { downloadDocument } from '../../functions/downloadfile';
import pickDocument from '../../functions/pickdocument';

//COMPONENTS
import Header from '../../components/header';
import Loading from '../../components/loading';
import AppButton from '../../components/button';
import AppTextInput from '../../components/textinput';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './style';
import { BACKGROUND_OVERLAY, PRIMARY_BRAND_1, PRIMARY_BRAND_2, TEXT, TEXTINPUT_FOCUSED, TEXTINPUT_UNFOCUSED } from '../../utils/colors';
import emptylistcomponent from './emptylistcomponent';


//CONSTANTS
const FILE_NAME = 'documentscreen.js'

const Documents = ({ navigation }) => {
    const { tripId } = navigation.state.params;
    const state = useSelector((state) => state.trip);
    const dispatch = useDispatch();
    const { resetError, resetObjectState } = tripSlice.actions;


    const bottomSheetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [documentDetails, setDocumentDetails] = useState([]);
    const [newDocument, setNewDocument] = useState({});

    useEffect(() => {
        console.log(`In ${FILE_NAME}: useEffect`);

        dispatch(resetObjectState('documentDetails'));
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (state.documentDetails) {
            setDocumentDetails(state.documentDetails[0]?.documents);
            setLoading(false);
        } else {
            dispatch(getDocumentDetails({ tripId }));
        }
    }, [state.documentDetails]);

    const onPressDeleteDocument = (documentId) => {
        const updatedDocumentDetails = documentDetails.filter(todo => todo._id !== documentId);
        setDocumentDetails(updatedDocumentDetails);

        dispatch(deleteDocumentDetails({
            documentId: documentId,
            tripId: tripId,
        }))
    };

    const renderDocument = ({ item, index }) => {
        return (
            <>
                <TouchableOpacity onPress={() => downloadDocument(item.base_64, item.title, item.extension)} style={[styles.documentContainer, { marginVertical: 10 }]}>
                    <View>
                        <Text style={styles.todoTask} numberOfLines={1} ellipsizeMode="tail">{index+1}. {item.title}</Text>
                        <Text style={styles.documentExtension} >{item.extension}</Text>
                    </View>

                    <TouchableOpacity onPress={() => onPressDeleteDocument(item._id)} >
                        <MaterialCommunityIcons name={'delete'} size={20} color={TEXT} />
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* <View style={styles.divider} /> */}
            </>
        );
    };

    const onPressAddDocument = async () => {
        setNewDocument(prevState => ({...prevState, base64: "", extension: "", placeholder: ""}));

        bottomSheetRef.current.open();
        const document = await pickDocument();

        setNewDocument(prevState => ({...prevState, base64: document.base64, extension: document.extension, placeholder: document.fileName}));
    }

    const onPressCancel = () => {
        setNewDocument({});
        bottomSheetRef.current.close();
    }

    const addNewTodo = () => {
        dispatch(createDocumentDetails({
            extension: newDocument.extension,
            title: newDocument.title || newDocument.placeholder,
            base64: newDocument.base64,
            tripId: tripId
        }));

        setNewDocument({});
        bottomSheetRef.current.close();
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header navigation={navigation} title={'Documents'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={documentDetails}
                    renderItem={renderDocument}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={emptylistcomponent}
                />
            </ScrollView>

            <TouchableOpacity
                // onPress={() => bottomSheetRef.current.open()}
                onPress={onPressAddDocument}
                style={styles.addButton}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
                <AntDesign name={'pluscircle'} size={45} color={PRIMARY_BRAND_2} />
            </TouchableOpacity>

            <RBSheet
                ref={bottomSheetRef}
                height={250}
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
                        placeholder={newDocument.placeholder}
                        value={newDocument}
                        onChangeText={text => setNewDocument(prevState => ({...prevState, title: text}))}
                        customStyle={{marginBottom: 10, textAlignVertical : 'top'}}
                    />

                    <TouchableOpacity onPress={onPressAddDocument} style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: TEXTINPUT_FOCUSED, width: '100%', marginBottom: 20 }} >
                        <Text>{newDocument.title || newDocument.placeholder}.{newDocument.extension}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <AppButton text={'Cancel'} onPress={onPressCancel} />
                        <AppButton text={'Done'} onPress={addNewTodo} />
                    </View>
                </View>
            </RBSheet>
        </>
    );
};

export default Documents;
