import React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { UPDATE_PASS } from '../Graphql/Mutations';
import { GET_USUARIO } from '../Graphql/Querys';
import { Context } from '../Context/context';

const CambioContra = () => {
  const { value, setValue } = useContext(Context);
  const persona = value.usuario;
  const [password, setPassword] = useState(persona.password)
  const [nuevaPassword, setNuevaPassword] = useState('')
  const navigation = useNavigation();

  const [updateContra] = useMutation(UPDATE_PASS, {
    variables: {
      id: persona.id,
      password: nuevaPassword
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

  function handleCambio() {
    if (persona.password === password) {
      updateContra().then((response) => {
        if (response.data) {
          alert('Contraseña modificada correctamente')
          navigation.navigate('Inicio')
          this.contraseñaInput.clear();
          this.contraseñaNuevaInput.clear();
        }
      })
        .catch((error) => {
          console.log(error);
          alert('El usuario ya existe')
          this.contraseñaNuevaInput.clear();
          this.contraseñaInput.clear();
          setNuevaPassword('')
          setPassword('')
        });
    }
  }

  useEffect(() => {
  }, [value]);

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.subtitulo}>Contraseña actual</Text>
        <TextInput
          style={styles.input}
          ref={input => { this.contraseñaInput = input }}
          placeholder='Ingrese la Contraseña Actual ' secureTextEntry={true}
          onChangeText={(newTextA) => {
            setPassword(newTextA);
          }}

        />
        <Text style={styles.subtitulo}>Nueva contraseña</Text>
        <TextInput
          style={styles.input}
          ref={input => { this.contraseñaNuevaInput = input }}
          placeholder='Ingrese la Contraseña Nueva ' secureTextEntry={true}
          onChangeText={(newTextC) => {
            setNuevaPassword(newTextC);
          }}

        />
        <Button title='Confirma' onPress={handleCambio} />
      </View>
    </View>
  )
}

export default CambioContra

const styles = StyleSheet.create({
  container: {
    flex:1,
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
})