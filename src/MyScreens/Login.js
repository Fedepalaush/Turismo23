import React from 'react'
import { Text, View, TextInput, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GET_USUARIO } from "../Graphql/Querys";
import { Context } from '../Context/context';


export default function Login() {
  const { value, setValue } = useContext(Context);
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();

  const [ingreso] = useLazyQuery(GET_USUARIO, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.usuarios.length > 0) {
        user = data.usuarios[0]['usuario'];
        pass = data.usuarios[0]['password'];
        id = data.usuarios[0]['id'];

        if ((user == usuario) && (password == pass)) {
          value.usuario.usuario = user
          value.usuario.id = id
          value.usuario.nombre = data.usuarios[0]['nombre'];
          value.usuario.password = data.usuarios[0]['password'];
          value.usuario.apellido = data.usuarios[0]['apellido'];
          setValue({ ...value });
        }
        else {
          alert('Contraseña Incorrecta')
          this.usuarioInput.clear();
          this.textInput.clear();
        }

      }
      else {
        alert('Usuario incorrecto')
        this.usuarioInput.clear();
        this.textInput.clear();
      }
    }
  });

  const handleSubmit = () => {
    ingreso({ variables: { usuario: usuario } });
  }
  const handleRegistro = () => {
    navigation.navigate('Registro')
  }

  useEffect(() => {
  }
  ), [value];

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={32}>
      <View style={styles.container}>
        <Image source={require('../assets/img/logo.png')} style={styles.imagen} />
        <View style={styles.data}>
          <Text style={styles.titulo}>Iniciar Sesion</Text>
          <View style={styles.inputs}>
            <Text style={styles.subtitulo}>Usuario</Text>
            <TextInput style={styles.input} ref={input => { this.usuarioInput = input }} placeholder='Ingrese el Usuario' onChangeText={(newTextE) => setUsuario(newTextE)} />
            <Text style={styles.subtitulo}>Contraseña</Text>
            <TextInput style={styles.input} ref={input => { this.textInput = input }} secureTextEntry={true} placeholder='Ingrese la contraseña'
              onChangeText={(newTextV) => setPassword(newTextV)} />
          </View>
          <Button title='Iniciar Sesion' onPress={handleSubmit} />
        </View>
        <View style={styles.registro}>
          <Text>Es la primera vez?</Text>
          <Button title='Registrarse' onPress={handleRegistro} />
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
  registro:{
    marginTop:100
  },

})