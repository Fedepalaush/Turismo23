import React from 'react'
import { Text, View, Image, StyleSheet, Button, ScrollView } from 'react-native'
import { Dimensions } from 'react-native';
import { useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Context } from "../Context/context"
import { GET_PUNTAJE } from '../Graphql/Querys';
import Map from './Map';
import Estrellas from './Estrellas';
import Boton from './Boton';


const Info = (props) => {


  let categoria = null; // default value for categoria

  if (props.hotel) {
    categoria = props.item.categoria.valor;
  }

  const { value, setValue } = useContext(Context);
  const navigation = useNavigation();
  const tipo = props.hotel ? "hotel" : "restaurante";

  const { loading, error, data } = useQuery(GET_PUNTAJE, {
    variables: {
      id_establecimiento: props.item.id,
      eshotel: props.hotel
    }
  });

  function esFavorito() {
    let objectWithId = null;
    if (tipo === 'hotel') {
      objectWithId = value.usuario.favoritos.find(obj => obj.establecimiento === props.item.id && obj.eshotel === true);
    }
    else {
      objectWithId = value.usuario.favoritos.find(obj => obj.establecimiento === props.item.id && obj.eshotel === false);
    }

    if (objectWithId) {
      return <Boton titulo='Recuerdos' color='black' myOnPress={() => { navigation.navigate('Recuerdos', { id: props.item.id, eshotel: props.hotel }) }} />
    }
  }


  function obtenerPuntaje() {
    const puntajes = data.comentario.map((comentario) => comentario.puntaje);
    const totalPuntajes = puntajes.reduce((acumulador, puntaje) => acumulador + puntaje, 0);
    const total = (totalPuntajes / puntajes.length).toFixed(1);
    if (isNaN(total)) {
      return <Text>No tuvo comentarios</Text>;
    } else {
      return <Text>El puntaje promedio obtenido es: {total} /5.0</Text>;
    }
  }

  function handlePuntaje() {
    navigation.navigate('Comentario', { id: props.item.id, eshotel: props.hotel, usuario: value.usuario.id })
  }

  return (
    <View>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>error</Text>
      ) : (
        <ScrollView >
          {props.item.foto ? (
            <Image source={{ uri: props.item.foto }} style={styles.imagen} />
          ) : (
            <Image source={require('../assets/img/image_notfound.png')} style={styles.imagen} />

          )}
          <View style={styles.info}>
            {props.hotel && <Estrellas categoria={categoria} />}
            <Text style={styles.titulo}>{props.item.nombre}</Text>
            <Text style={styles.direccion}>{props.item.domicilio}, {props.item.localidade.nombre}</Text>

            {!props.hotel && (       
                <View style={styles.dataGast}>
                  <View style={styles.dataPropia}>
                    <Text style={styles.subtitulo}>Especialidades: </Text>
                    {props.item.especialidad_gastronomicos.map((especialidad, index) => {
                      return <Text key={index}>{especialidad.especialidade.nombre}, </Text>
                    })}
                  </View>
                  <View style={styles.dataPropia}>
                    <Text style={styles.subtitulo}>Actividades: </Text>
                    {props.item.actividad_gastronomicos.map((actividad, index) => {
                      return <Text key={index}>{actividad.actividade.nombre}, </Text>
                    })}
                  </View>
                </View>
            )}
            <View style={styles.puntaje}>
              {obtenerPuntaje()}
            </View>
            <View style={styles.botones}>
              {esFavorito()}
              <Boton titulo='Reseñas' myOnPress={handlePuntaje} color='black' />
            </View>
          </View>
          <View style={styles.mapa}>
            <Map item={props.item} />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Info


const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom:7,
    fontSize: 22,
  },
  direccion: {
    fontWeight: '400',
    color: '#000',
    fontSize: 16,
  },
  botones: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between',
    marginTop: 10
  },
  imagen: {
    width:'100%',
    height: 280,
    flexGrow: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 12
  },
  texto: {
    fontSize: 17,
  },
  info: {
    paddingLeft: 5,
    paddingBottom: 20
  },
  linea: {
    paddingTop: 10
  },
  subtitulo: {
    color: 'black', fontWeight: 'bold'
  },
  mapa: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: 250,

  },
  dataGast:{
    marginTop:10
  },
  puntaje: {
    marginVertical: 7
  },
  dataPropia: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})