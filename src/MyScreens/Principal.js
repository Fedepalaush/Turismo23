import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { Context } from '../Context/context';
import { GET_ALOJAMIENTOS, GET_GASTRONOMICOS } from "../Graphql/Querys";
import { GET_FAVORITOS } from '../Graphql/Querys';
import CajaMain from '../Components/CajaMain';
import ImagenesMain from '../assets/ImagenesMain'

const Principal = () => {
    const { value, setValue } = useContext(Context);
    const { loading, error, data } = useQuery(GET_ALOJAMIENTOS);
    const { loading: loadingGast, error: errorGast, data: dataGast } = useQuery(GET_GASTRONOMICOS, {
        pollInterval: 5000,
    });
    const { loading: loadingFav, error: errorFav, data: dataFav } = useQuery(GET_FAVORITOS, {
        variables: { usuario: value.usuario.id },

    })

    useEffect(() => {
        if (data) {
            value.alojamientos.data = data.alojamientos.map(x => ({ ...x, visible: true, recuerdos: [] }));
            setValue({ ...value });
        }

        if (dataGast) {
            value.gastronomicos.data = dataGast.gastronomicos.map(x => ({ ...x, visible: true, recuerdos: [] }));
            setValue({ ...value });
        }

        if (dataFav) {
            value.usuario.favoritos = dataFav.favoritos
            setValue({ ...value });
        }
    }, [data, dataGast, dataFav]);

    return (
        <View >
            {loading || loadingGast || loadingFav ? (
                <Text>Cargando...</Text>
            ) : error || errorGast ? (
                <Text>error</Text>
            ) : (<View style={styles.container}>
                <View style={styles.imagenMain}>
                <Image source={require('../assets/img/main.jpg')} style={styles.imagenMain} />
                </View>
                <View style={styles.cajas} >
                    <CajaMain imagen={ImagenesMain.image1} screen='Hoteles' />
                    <CajaMain imagen={ImagenesMain.image2} screen='Restaurantes'  />
                    <CajaMain imagen={ImagenesMain.image3} screen='Favoritos'  />
                    <CajaMain imagen={ImagenesMain.image4} screen='Mapa'  />
                </View>

            </View>
            )}
        </View>
    )
}

export default Principal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent:'space-between'


    },
    imagenMain: {
        height:250,
        resizeMode:'stretch'
    },
    cajas: {
        flex:2,
        margin:15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        alignContent:'space-around'
    },
})