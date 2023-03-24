import React from "react";
import { View, Text, Image, StyleSheet,Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Linea from "./Linea";
import Boton from "./Boton";
import Fav from "./Fav";

export default function Restaurante(props) {
  const navigation = useNavigation();
  const botonIngresa = () => {
    navigation.navigate('Detalle',{ id: props.item.id, hotel:false})
       }

  return (
    <View style={styles.container}>
       {props.item.foto ? (
      <Image source={{ uri: props.item.foto }} style={styles.imagen} />
    ) : (
      <Image source={require('../assets/img/image_notfound.png')} style={styles.imagen} />

    )}
      <View >
      <View style={styles.nombreFav}>
        <Text style={styles.titulo}>{props.item.nombre}</Text>
        <Fav item={props.item} isAlojamiento={false}/>
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.texto}>{props.item.domicilio}</Text>
            <Text style={styles.texto}>{props.item.localidade?.nombre}</Text>
          </View>
          <Boton titulo='Ingresa' myOnPress={botonIngresa}/>
        </View>
      </View>
      <View style={styles.linea}>
      <Linea />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom:10
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    fontSize: 25,
  },
  imagen: {
    width: (Dimensions.get('window').width) * 0.95,
    height: 180,
    flexGrow: 1,
    alignSelf: 'center',
    resizeMode:'cover',
  },
  texto: {
    fontSize: 17,
  },
  info: {
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'flex-end'
  },
  linea:{
    paddingTop:10
  },
  nombreFav:{
    flexDirection:"row",
    justifyContent:'space-between'
    
  }
})