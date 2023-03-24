import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Estrellas from '../Components/Estrellas'

const ComentarioComp = (props) => {
    return (
        <View style={styles.container}>
            
            <Text style={styles.usuario}>{props.usuario}</Text>
            <View style={styles.calificacion}>
                <Text>Calificacion: </Text>
                <Estrellas categoria={props.puntaje} />
            </View>
            <Text>Comentario: {props.comentario}</Text>
        </View>
    )
}

export default ComentarioComp

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    calificacion:{
        flexDirection:'row'
    },
    usuario:{
        fontSize:17,
        fontWeight:'bold',
        color:'black'
    },
})