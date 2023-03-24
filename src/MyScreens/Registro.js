import React from 'react'
import { Text, TextInput, View, Button, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_USUARIO_MUTATION } from '../Graphql/Mutations'


export default function Registro() {
  const [usuario, setUsuario] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();


  const [createUsuario] = useMutation(CREATE_USUARIO_MUTATION, {
    variables: {
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      password: password
    }
  });

  function cargaExitosa() {
    createUsuario()
      .then((response) => {
        if (response.data) {
          alert('Usuario registrado correctamente')
          navigation.navigate('Login')
          this.usuarioInput.clear();
          this.textInput.clear();
        }
      })
      .catch((error) => {
        console.log(error);
        alert('El usuario ya existe')
        this.nombreInput.clear();
        this.apellidoInput.clear();
        this.usuarioInput.clear();
        this.textInput.clear();
        setPassword('')
      });
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={32}>
      <View style={styles.container}>
        <Image source={require('../assets/img/logo.png')} style={styles.imagen} />
        <View style={styles.data}>
          <Text style={styles.titulo}>Registrarse</Text>
          <View style={styles.inputs}>
            <Text style={styles.subtitulo}>Nombre</Text>
            <TextInput style={styles.input} ref={input => { this.nombreInput = input }} placeholder='Ingrese el Nombre' onChangeText={(newTextN) => setNombre(newTextN)} />
            <Text style={styles.subtitulo}>Apellido</Text>
            <TextInput style={styles.input} ref={input => { this.apellidoInput = input }} placeholder='Ingrese el Apellido' onChangeText={(newTextA) => setApellido(newTextA)} />
            <Text style={styles.subtitulo}>Usuario</Text>
            <TextInput style={styles.input} ref={input => { this.usuarioInput = input }} placeholder='Ingrese el Usuario' onChangeText={(newTextE) => setUsuario(newTextE)} />
            <Text style={styles.subtitulo}>Contraseña</Text>
            <TextInput style={styles.input} ref={input => { this.textInput = input }} secureTextEntry={true} placeholder='Ingrese el password'
              onChangeText={(newTextV) => setPassword(newTextV)} />
          </View>
          <Button title='Registrar' onPress={cargaExitosa} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

  },
  titulo: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  data: {
    width: '90%'
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#000'
  },
  inputs: {
    marginVertical: 25,
    alignContent: 'flex-start',
    alignItems: 'stretch',
  },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20
  },

})