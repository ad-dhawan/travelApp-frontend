import { StyleSheet } from "react-native";

import { BACKGROUND, TEXT, TEXT_WHITE } from "../../utils/colors";
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
})

export default styles;
