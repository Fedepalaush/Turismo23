import React from 'react'
import { Text, View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useContext, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { GET_MENSAJES } from "../Graphql/Querys";
import { POST_MESSAGE } from '../Graphql/Mutations';
import { Context } from '../Context/context';
import BurbujaMensaje from '../Components/BurbujaMensaje';

export default function Chat() {
  let { data, loading, error } = useSubscription(GET_MENSAJES)
  const { value, setValue } = useContext(Context);
  const [mensaje, setMensaje] = useState('')

  const [createMensaje] = useMutation(POST_MESSAGE, {
    variables: {
      usuario: value.usuario.id,
      mensaje: mensaje,
    },
    onCompleted: () => {
      setMensaje('')
    }
  });

  return (

    <View style={{ flex: 1 }}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>error</Text>
      ) : (
        <View style={styles.container} >
          <ScrollView style={{ flex: 0.9 }}>
            <KeyboardAvoidingView
              behavior='position'
              keyboardVerticalOffset={32}>


              {data.mensajes.map((mensaje) => {
                const isMe = mensaje.usuario === value.usuario.id
                return <View key={mensaje.id_mensaje} >
                  <BurbujaMensaje isMe={isMe} mensaje={mensaje.mensaje} usuario={mensaje.usuarioByUsuario.usuario} />
                </View>
              })}
            </KeyboardAvoidingView>
          </ScrollView>
          <View style={styles.mensaje}>
            <TextInput style={styles.input} value={mensaje} onChangeText={setMensaje} placeholder="Escibe su mensaje" />
            <Button title="Enviar" onPress={createMensaje} />
          </View>
        </View>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mensajes: {
    backgroundColor: 'gray',
    width: '40%'
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#000'
  },
});