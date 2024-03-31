import { StyleSheet } from "react-native";

import { BACKGROUND, BACKGROUND_OVERLAY, TEXT, TEXT_WHITE } from "../../utils/colors";

export default styles = StyleSheet.create({
    //login
    parentContainer: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BACKGROUND_OVERLAY
    },
    itemsContainer: {
        top: '30%',
        padding: 20
    },
    bgOverlay: {
        height: '100%',
        width: '100%',
        backgroundColor: BACKGROUND_OVERLAY,
        position: 'absolute'
    },
    titleText: {
        fontSize: 20,
        color: TEXT_WHITE
        ,fontWeight: 'bold'
    },
    googleContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    signinText: {
        color: TEXT,
        fontSize: 16,
        marginLeft: 10
    },
});
