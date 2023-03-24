import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Button, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Context } from '../Context/context';
import OverlayInfo from '../Components/OverlayInfo';
import OverlayFiltrosAlojamiento from "../Components/OverlayFiltrosAlojamientos";
import OverlayFiltrosGastr from "../Components/OverlayFiltrosGastr";

export default function Mapa() {

  const initialPosition = {
    latitude: -54.7999968,
    longitude: -68.2999988,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const { value, setValue } = useContext(Context);
  const [visible, setVisible] = useState(false)
  const [visibleFiltroAlojamiento, setVisibleFiltroAlojamiento] = useState(false)
  const [visibleFiltroGastronomico, setVisibleFiltroGastronomico] = useState(false)
  const [item, setItem] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const filtroHotel = value.alojamientos.filtros
  const filtroActiveH = getFiltro(filtroHotel)
  const filtroRestaurante = value.gastronomicos.filtros
  const filtroActiveR = getFiltro(filtroRestaurante)

  async function requestGeolocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Geolocation Permiso',
          'message': 'Necesita acceso a tu ubicacion'
        });
    } catch (err) {
      console.warn(err)
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlayFiltroAlojamiento = () => {
    setVisibleFiltroAlojamiento(!visibleFiltroAlojamiento);
  };
  const toggleOverlayFiltroGastronomico = () => {
    setVisibleFiltroGastronomico(!visibleFiltroGastronomico);
  };

  function getFiltro (filtro){
    return Object.values(filtro).some(value => value !== null);
  }

  function cargaMapa(value) {
    return [
      ...value.alojamientos.data.map((alojamiento, idx) => (
        <View key={idx}>
          {alojamiento.visible && (
            <Marker
              key={idx}
              tracksViewChanges={false}
              coordinate={{ latitude: alojamiento.lat, longitude: alojamiento.lng }}
              onPress={(e) => {
                e.stopPropagation();
                setVisible(true);
                setItem(alojamiento);
              }}
            >
              <Icon name="hotel" backgroundColor="white" />
            </Marker>
          )}
        </View>
      )),
      ...value.gastronomicos.data.map((gastronomico, idx) => (
        <View key={`g-${idx}`}>
          {gastronomico.visible && (
            <Marker
              key={`g-${idx}`}
              tracksViewChanges={false}
              coordinate={{ latitude: gastronomico.lat, longitude: gastronomico.lng }}
              onPress={(e) => {
                e.stopPropagation();
                setVisible(true);
                setItem(gastronomico);
              }}
            >
              <Icon name="cutlery" backgroundColor="white" />
            </Marker>
          )}
        </View>
      )),
    ];
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude,
      })
    },
      error => alert(error.message),
      { timeout: 15000, maximumAge: 10000 }
    );
    cargaMapa(value)
  }, [value]);

  console.log(getFiltro(filtroHotel))
  requestGeolocationPermission();
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.botones}>
          <OverlayFiltrosAlojamiento visible={visibleFiltroAlojamiento} closeOverlay={toggleOverlayFiltroAlojamiento} />
          <Button color={'black'} title={filtroActiveH ? "Filtros Alojamientos ✅" : "Filtros Alojamientos"} onPress={toggleOverlayFiltroAlojamiento} />
          <OverlayFiltrosGastr visible={visibleFiltroGastronomico} closeOverlay={toggleOverlayFiltroGastronomico} />
          <Button color={'black'}  title={filtroActiveR ? "Filtros Gastronomicos ✅" : "Filtros Gastronomicos"} onPress={toggleOverlayFiltroGastronomico} />
        </View>
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={currentPosition}
        showsUserLocation
      >
        {cargaMapa(value)}
      </MapView>
      {visible ?
        (<OverlayInfo visible={visible} closeOverlay={toggleOverlay} data={item} onVisible={setVisible} />
        )
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  botones:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  image: {
    width: 120,
    height: 80
  }
})