import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
 import { Marker } from 'react-native-maps';
export default function Map (props) {

  return (
    <View style={styles.container}>
    <MapView
    style={styles.map}
    initialRegion={{
        latitude: props.item.lat,
        longitude: props.item.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    }}
    >
 <Marker
    coordinate={{
      latitude: props.item.lat,
      longitude: props.item.lng,
    }}
  />
  </MapView>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
flex:1
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });