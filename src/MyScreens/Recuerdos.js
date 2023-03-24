import React from 'react'
import { Text, View, Image, Button, ScrollView, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
import { Context } from "../Context/context"
import { DELETE_RECUERDO_MUTATION } from '../Graphql/Mutations';
import { GET_RECUERDOS } from '../Graphql/Querys';


const Recuerdos = (props) => {

  const { value, setValue } = useContext(Context);
  const navigation = useNavigation();
  const [seleccionado, setSeleccionado] = useState(null)
  const { loading, error, data } = useQuery(GET_RECUERDOS, {
    variables: {
      usuario: value.usuario.id,
      establecimiento: props.route.params.id,
      eshotel: props.route.params.eshotel
    },
  })
  function handleCamara() {
    navigation.navigate('Camara', { id: props.route.params.id, eshotel: props.route.params.eshotel })
  }

  const [deleteRecuerdo] = useMutation(DELETE_RECUERDO_MUTATION, {
    variables: { id: seleccionado },
    refetchQueries: [
      {
        query: GET_RECUERDOS,
        variables: {
          usuario: value.usuario.id,
          establecimiento: props.route.params.id,
          eshotel: props.route.params.eshotel
        },
        awaitRefetchQueries: true,
      },
    ],
  });

  function handleBorrar(recuerdo) {
    setSeleccionado(recuerdo)
  }

  useEffect(() => {
    if (seleccionado) {
      deleteRecuerdo({ variables: { id: seleccionado } })
      setSeleccionado(null)
    }
  }, [seleccionado])


  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>error</Text>
      ) : (
        <ScrollView style={styles.data}>
          <Button color={'black'} title='Camara' onPress={handleCamara} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {data.recuerdos.map((recuerdo, idx) => {
              return <View key={idx} style={styles.recuerdo}>
                <Image style={styles.imagen}
                  source={{ uri: recuerdo.foto }}></Image>
                <Button title='Eliminar' onPress={() => handleBorrar(recuerdo.id)} />
              </View>

            })}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  )
}
export default Recuerdos


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  data:{
    width:'100%',
  },
  scrollContainer:{
    width:'100%', 
    height:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  recuerdo:{
    width:'45%',
    margin:5

  },
  imagen: {
    height: 150,
  },
})