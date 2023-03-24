import { View, Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Searchbar } from "react-native-paper";
import { Context } from '../Context/context';
import { GET_PROPS_ALOJAMIENTOS } from '../Graphql/Querys';
import DropdownCustom from "./DropdownCustom";
import Boton from './Boton';


export default function OverlayFiltrosAlojamiento(props) {

    const { value, setValue } = useContext(Context);
    const filtros = value.alojamientos.filtros
    const [textoFiltro, setTextoFiltro] = useState(value.alojamientos.filtros.texto)
    const { loading: loadingProps, error: errorProps, data: dataProps } = useQuery(GET_PROPS_ALOJAMIENTOS);

    

    const botonFiltra = () => {
        value.alojamientos.data.map((alojamiento) => {
            if (
                (!textoFiltro || alojamiento.nombre.toLowerCase().includes(textoFiltro.toLowerCase())) &&
                (!filtros.categorias || filtros.categorias === alojamiento.categoria.id) &&
                (!filtros.localidades || filtros.localidades === alojamiento.localidade.id) &&
                (!filtros.clasificaciones || filtros.clasificaciones === alojamiento.clasificacione.id)
            ) {
                alojamiento.visible = true
            }
            else {
                alojamiento.visible = false
            }

        });
        value.alojamientos.filtros.texto= textoFiltro
        if (textoFiltro || filtros.categorias || filtros.localidades || filtros.clasificaciones){
            filtros.condicion= true
        }
        setValue({ ...value });
    }

    const restablecerFiltros = () => {
        value.alojamientos.data.map((alojamiento) => {
            alojamiento.visible = true
        })
        setTextoFiltro(null)
        for (let key in value.alojamientos.filtros) {
            value.alojamientos.filtros[key] = null;
        }
        setValue({ ...value });
    }


    useEffect(() => {
    }, [value.alojamientos.filtros])

    return (
        <View>
            {loadingProps ? (
                <Text>Cargando...</Text>
            ) : errorProps ? (
                <Text>error</Text>
            ) : (
                <Overlay isVisible={props.visible} onBackdropPress={props.closeOverlay} overlayStyle={{ width: 350, height: 600 }} >
                    <Searchbar placeholder="Buscar"
                        value={textoFiltro}
                        onChangeText={(newText) => setTextoFiltro(newText)}
                    />
                    <DropdownCustom data={dataProps.localidades} value={filtros.localidades} eshotel={true} />
                    <DropdownCustom data={dataProps.categorias} value={filtros.categorias} eshotel={true} />
                    <DropdownCustom data={dataProps.clasificaciones} value={filtros.clasificaciones} eshotel={true} />
                    <View style={styles.botones}>   
                        <Boton titulo="Filtrar" myOnPress={botonFiltra}></Boton>
                        <Boton titulo="Reiniciar" myOnPress={restablecerFiltros}></Boton>
                    </View>
                </Overlay>)}
        </View>
    )
}

const styles = StyleSheet.create({
    botones: {
        flexDirection:'row',
        justifyContent:'space-around'


    },
    })