import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Overlay } from 'react-native-elements';
import Boton from './Boton';

export default function OverlayInfo(props) {
    const tipo = props.data.__typename
    const navigation = useNavigation();
    const hotel = (tipo === 'alojamientos') ? true : false;

    const botonIngresa = () => {
        { props.onVisible(false) }
        navigation.navigate('Detalle',{ id: props.data.id, hotel:hotel})
    }

    return (
        <View style={styles.container} >
            <Overlay isVisible={props.visible} onBackdropPress={props.closeOverlay} >
                <Text style={styles.titulo}>{props.data.nombre}</Text>
                {props.data.foto ? (
                    <Image source={{ uri: props.data.foto }} style={styles.imagen} />
                ) : (
                    <Image source={require('../assets/img/image_notfound.png')} style={styles.imagen} />

                )}
                <View style={styles.boton}>
                    <Boton titulo='Ir'color='black' myOnPress={botonIngresa}>Ir</Boton>
                </View>
            </Overlay>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        marginBottom: 10
    },
    boton:{
        alignSelf:'center'
    },

    imagen: {
        height: 450,
        width: 350,
        marginBottom: 15
    }
})