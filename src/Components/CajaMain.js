import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const CajaMain = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(props.screen)}>
                <Image source={props.imagen} style={styles.imagen} />
            </TouchableOpacity>
        </View>
    )
}

export default CajaMain

const styles = StyleSheet.create({
    container: {
        width: 'auto',

    },
    imagen: {
        resizeMode: 'cover',
        height: 180,
        width: 180
    }
})