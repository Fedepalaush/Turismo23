import React from 'react'
import {  StyleSheet } from 'react-native'
import { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from '@apollo/client';
import { Context } from '../Context/context';
import { GET_FAVORITOS } from '../Graphql/Querys';
import { CREATE_FAVORITO_MUTATION, DELETE_FAVORITO_MUTATION } from '../Graphql/Mutations';


const Fav = (props, isAlojamiento) => {
  const { value, setValue } = useContext(Context);
  const [isPress, setIsPress] = useState(false)

  const [createFav] = useMutation(CREATE_FAVORITO_MUTATION, {
    variables: {
      usuario: value.usuario.id,
      establecimiento: props.item.id,
      eshotel: props.isAlojamiento
    },
    refetchQueries: [
      {
        query: GET_FAVORITOS,
        variables: { usuario: value.usuario.id },
        awaitRefetchQueries: true,
      },
    ],
  });


  const [deleteFav] = useMutation(DELETE_FAVORITO_MUTATION, {
    variables: {
      usuario: value.usuario.id,
      establecimiento: props.item.id,
      eshotel: props.isAlojamiento
    },
    refetchQueries: [
      {
        query: GET_FAVORITOS,
        variables: { usuario: value.usuario.id },
        awaitRefetchQueries: true,
      },
    ],
  });



  const agregadoFav = async () => {
    try {
      if (!isPress) {
        setIsPress(!isPress)
        createFav()
          .then((response) => {
            if (response.data) {
              alert('Agregado')
            }
          })

      }
      //Si está presionado
      else {
        setIsPress(!isPress)
        deleteFav()
          .then((response) => {
            if (response.data) {
              alert('Eliminado')
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getFav = () => {
    value.usuario.favoritos.map((item) => {
      if (item.establecimiento == props.item.id & item.eshotel == props.isAlojamiento) {
        setIsPress(true)
      }
    })
  }

  useEffect(() => {
    getFav()
  }, [])
  return (
    <Icon name="heart"
      style={[{ color: isPress ? 'red' : 'black' }, styles.heart]} size={20}
      onPress={agregadoFav} />
  )}

export default Fav

const styles = StyleSheet.create({
  heart: {
    marginTop: 20,
  },
})