import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

//COMPONENTS
import Header from '../../components/header';

//ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesom6 from 'react-native-vector-icons/FontAwesome6'

//CONSTANTS
const FILE_NAME = 'transportscreen.js';
import { BACKGROUND, PRIMARY_BRAND_2, PRIMARY_BRAND_2_OVERLAY, TEXT, TEXTINPUT_FOCUSED, TEXT_WHITE } from '../../utils/colors';

const Transport = ({ navigation }) => {
    const navigationItems = [
        { id: '1', title: 'Flights', icon: <MaterialIcons name={'flight'} size={18} color={TEXT_WHITE} /> },
        { id: '2', title: 'Trains', icon: <MaterialCommunityIcons name={'train'} size={18} color={TEXT_WHITE} /> },
        { id: '3', title: 'Bus', icon: <MaterialCommunityIcons name={'train-car-passenger'} size={18} color={TEXT_WHITE} /> },
        { id: '4', title: 'Rentals', icon: <MaterialCommunityIcons name={'car'} size={18} color={TEXT_WHITE} /> },
        { id: '5', title: 'Ship', icon: <FontAwesom6 name={'sailboat'} size={18} color={TEXT_WHITE} /> }
    ];

    const [selectedTab, setSelectedTab] = useState(navigationItems[0].id);

    const renderTab = ({ item }) => (
        <TouchableOpacity
            style={[styles.tab, selectedTab === item.id && styles.selectedTab]}
            onPress={() => setSelectedTab(item.id)}
        >
            {item.icon}
            <Text style={[styles.tabText, selectedTab === item.id && {color: TEXT_WHITE}]}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderComponent = () => {
        switch (selectedTab) {
            case '1':
                return <FlightsComponent />;
            case '2':
                return <TrainsComponent />;
            case '3':
                return <BusComponent />;
            case '4':
                return <RentalsComponent />;
            case '5':
                return <ShipComponent />;
            default:
                return null;
        }
    };

    // Your component for Flights
    const FlightsComponent = () => (
        <View style={styles.componentContainer}>
            <Text>Flight</Text>
        </View>
    );

    // Your component for Trains
    const TrainsComponent = () => (
        <View style={styles.componentContainer}>
            <Text>Trains</Text>
        </View>
    );

    // Your component for Bus
    const BusComponent = () => (
        <View style={styles.componentContainer}>
            <Text>Bus</Text>
        </View>
    );

    // Your component for Rentals
    const RentalsComponent = () => (
        <View style={styles.componentContainer}>
            <Text>Rentals</Text>
        </View>
    );

    // Your component for Ship
    const ShipComponent = () => (
        <View style={styles.componentContainer}>
            <Text>Ship</Text>
        </View>
    );

    return (
        <>
            <Header navigation={navigation} title={'Transport'} />

            <View>
                <FlatList
                    horizontal
                    data={navigationItems}
                    renderItem={renderTab}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.tabContainer}
                    showsHorizontalScrollIndicator={false}
                />
                {renderComponent()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    tab: {
        marginRight: 10,
        padding: 8,
        borderRadius: 8,
        backgroundColor: PRIMARY_BRAND_2_OVERLAY,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedTab: {
        backgroundColor: PRIMARY_BRAND_2
    },
    tabText: {
        fontSize: 14,
        color: TEXT,
        marginLeft: 5
    },
    componentContainer: {
        // flex: 1,
    },
});

export default Transport;
