import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Context } from '../Context/context';

const Logout = () => {
    const navigation = useNavigation();
    const {value, setValue} = useContext(Context);

    function salir (){
        value.usuario.id = null
        setValue({ ...value });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitulo}>Realmente desea salir?</Text>
            <View style={styles.botones}>
            <Button title="Volver" onPress={() => navigation.navigate('Inicio')}></Button>
            <Button title="Salir" onPress={salir}></Button>
            </View>
        </View>
    )}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex:1,
      marginTop: 30,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
  
    },
    botones:{
        flexDirection:'row',
        width:150,
        justifyContent:'space-evenly'
        
    },
    subtitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8
      },
})