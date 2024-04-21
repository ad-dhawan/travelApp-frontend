import { StyleSheet } from "react-native";

import { BACKGROUND, BACKGROUND_OVERLAY, ERROR, ICON, MODAL_BUTTON_TEXT, PLACEHOLDER_COLOR, PRIMARY_BRAND_1, PRIMARY_BRAND_2, PRIMARY_BRAND_2_OVERLAY, TEXT, TEXTINPUT_FOCUSED, TEXTINPUT_ICON, TEXT_WHITE } from "../../utils/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/values";

const styles = StyleSheet.create({
    //Profile page
    profilePageParentContainer: {
        padding: 20,
        alignItems: 'center',
        flex: 1
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    editProfileImage: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: BACKGROUND,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -5,
        right: -5,
        elevation: 2
    },
    userFullName: {
        marginTop: 20,
        color: TEXT,
        fontSize: 20,
    },
    username: {
        color: PLACEHOLDER_COLOR
    },

    tripsCountParentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    tripsCountContainer: {
        alignItems: 'center',
        marginHorizontal: 30
    },
    tripsCount: {
        fontSize: 18,
        backgroundColor: ICON,
        color: TEXT_WHITE,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5
    },
    tripsCountText: {
        color: BACKGROUND_OVERLAY,
        fontSize: 11,
        fontWeight: 'bold'
    },
    createNewTripText: {
        fontSize: 14,
        color: MODAL_BUTTON_TEXT,
        marginTop: 15,
        fontWeight: 'bold'
    },

    logoutParentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 18,
        marginLeft: 5,
        color: ERROR,
    },
    appVersionText: {
        fontSize: 12,
        color: PLACEHOLDER_COLOR
    },
})

export default styles;
