import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import { Context } from "../Context/context"
import { CREATE_RECUERDO_MUTATION } from '../Graphql/Mutations';
import { GET_RECUERDOS } from '../Graphql/Querys';

const CamaraComp = (props) => {
  const [camara, setCamara] = useState('')
  const [foto, setFoto] = useState('')
  const navigation = useNavigation();
  const { value, setValue } = useContext(Context);
  console.log(props.data.route.params)
  const [guardarFoto] = useMutation(CREATE_RECUERDO_MUTATION, {
    variables: {
      usuario: value.usuario.id,
      establecimiento: props.data.route.params.id,
      eshotel: props.data.route.params.eshotel,
      foto: foto

    },
    refetchQueries: [
      {
        query: GET_RECUERDOS,
        variables: {
          usuario: value.usuario.id,
          establecimiento: props.data.route.params.id,
          eshotel: props.data.route.params.eshotel
        },
        awaitRefetchQueries: true,
      },
    ],
  });

  takePicture = async () => {
    if (camara) {
      const options = { quality: 0.5, base64: true };
      const data = await camara.takePictureAsync(options);
      CameraRoll.save(data.uri);
      setFoto(data.uri)
      guardarFoto()
      navigation.navigate('Detalle', { id: props.data.route.params.id, hotel:props.data.route.params.eshotel })
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          setCamara(ref);
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permisos para usar camara',
          message: 'Se requieren permisos para usar la camara',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permisos para grabar audio',
          message: 'Se requieren permisos para grabar audio',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        }}

      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> Capturar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CamaraComp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});