import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style'

export default EmptyListComponent = () => {
    return(
        <>
            <View style={styles.emptyListComponentContainer} >
                <Image source={require('../../assets/empty.png')} style={styles.emptyListComponentImage} />
                <Text style={styles.emptyListComponentHeading} >No Data</Text>
                <Text style={styles.emptyListComponentText} >Click the + button below to add your first item</Text>
            </View>
        </>
    )
}