import React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { Context } from "../Context/context"
import { UPDATE_USER } from '../Graphql/Mutations';
import { GET_USUARIO } from '../Graphql/Querys';

const ModificarUsuario = () => {
  const { value, setValue } = useContext(Context);
  const persona = value.usuario;
  const [usuario, setUsuario] = useState(persona.usuario)
  const [nombre, setNombre] = useState(persona.nombre)
  const [apellido, setApellido] = useState(persona.apellido)
  const navigation = useNavigation();

  const [UpdateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: persona.id,
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
    },
    refetchQueries: [
      {
        query: GET_USUARIO,
        variables: {
          usuario: persona.id,
        },
        awaitRefetchQueries: true,
      }]
  });

  function cargaExitosa() {
    UpdateUser()
      .then((response) => {
        if (response.data) {
          alert('Usuario modificado correctamente')
          navigation.navigate('Inicio')
          this.nombreInput.clear();
          this.apellidoInput.clear();
          this.usuarioInput.clear();

        }
      })
      .catch((error) => {
        console.log(error);
        alert('El usuario ya existe')
        this.nombreInput.clear();
        this.apellidoInput.clear();
        this.usuarioInput.clear();
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.data}>
      <Text style={styles.subtitulo}>Nombre</Text>
        <TextInput
          style={styles.input}
          ref={input => { this.nombreInput = input }} placeholder='Ingrese el Nombre' onChangeText={(newTextN) => setNombre(newTextN)}
          value={nombre} />
           <Text style={styles.subtitulo}>Apellido</Text>
        <TextInput
          style={styles.input}
          ref={input => { this.apellidoInput = input }}
          placeholder='Ingrese el Apellido'
          onChangeText={(newTextA) => {
            setApellido(newTextA);
          }}
          value={apellido}
        />
         <Text style={styles.subtitulo}>Usuario</Text>
        <TextInput style={styles.input} ref={input => { this.usuarioInput = input }} placeholder='Ingrese el Usuario' onChangeText={(newTextE) => setUsuario(newTextE)}
          value={usuario} />
      </View>
      <Button title='Modificar' onPress={cargaExitosa} />
    </View>
  )
}

export default ModificarUsuario

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8
  },
  data:{
    width:'90%'
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#000'
  },
})