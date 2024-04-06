import { StyleSheet } from "react-native";

import { BACKGROUND, BACKGROUND_OVERLAY, PLACEHOLDER_COLOR, PRIMARY_BRAND_2_OVERLAY, TEXT, TEXTINPUT_FOCUSED, TEXTINPUT_ICON, TEXT_WHITE } from "../../utils/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/values";

const styles = StyleSheet.create({
    //UPCOMING TRIP
    headerContainer: {
        backgroundColor: '#F4EAEA',
        paddingTop: 10,
        borderBottomRightRadius: 80,
        justifyContent: 'flex-end',
    },
    upcomingAnimation: {
        height: 200,
    },
    headerFooter: {
        backgroundColor: '#D2A4A3',
        borderBottomRightRadius: 60,
        paddingBottom: 10
    },

    tripTitle: {
        paddingHorizontal: 10,
        marginBottom: 40,
        fontSize: 22,
        color: TEXT
    },

    timeLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    timeLeftItem: {
        alignItems: 'center'
    },
    timeLeft: {
        backgroundColor: '#E6DDDD',
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 6,
        fontSize: 20
    },
    timeLeftText: {
        fontSize: 12,
        marginTop: 5
    },

    viewItineraryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    viewItineraryText: {
        color: TEXT_WHITE,
        marginRight: 6,
        fontWeight: 'bold'
    },

    otherItemsParentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    otherItemsContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: BACKGROUND,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1/3.8
    },
    otherItemImage: {
        height: 50,
        width: 50
    },
    otherItemText: {
        fontSize: 16,
        color: TEXT,
        marginTop: 10
    },


    //TODO
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    todoTask: {
        fontSize: 15,
        color: TEXT
    },
    divider: {
        height: 1,
        borderWidth: .5,
        borderColor: PLACEHOLDER_COLOR
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },


    //DOCUMENT
    documentContainer: {
        padding: 10,
        backgroundColor: PRIMARY_BRAND_2_OVERLAY,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 10
    },
    documentExtension: {
        fontSize: 12,
        color: TEXTINPUT_ICON,
        marginLeft: 20
    },


    //BOOKING
    bookingContainer: {
        padding: 15,
        backgroundColor: PRIMARY_BRAND_2_OVERLAY,
        borderRadius: 8,
        margin: 10
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bookingTitle: {
        fontSize: 15,
        color: TEXT,
        fontWeight: 'bold'
    },
    bookingAddress: {
        fontSize: 12,
        color: TEXT,
        maxWidth: '90%'
    },
    bookingNumberContainer: {
        marginVertical: 15
    },
    bookingDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bookingHeading: {
        fontSize: 10,
        color: BACKGROUND_OVERLAY
    },
    bookingDetail: {
        fontSize: 12,
        color: TEXT
    },
})

export default styles;
