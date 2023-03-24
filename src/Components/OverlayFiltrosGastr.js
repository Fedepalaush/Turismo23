import { View, Text, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Overlay } from 'react-native-elements';
import { Searchbar } from "react-native-paper";
import { useQuery } from '@apollo/client';
import { GET_PROPS_GASTRONOMICOS } from '../Graphql/Querys';
import { Context } from '../Context/context';
import DropdownCustom from "./DropdownCustom";
import Boton from './Boton';

export default function OverlayFiltrosGastr(props) {
    const { value, setValue } = useContext(Context);
    const filtros = value.gastronomicos.filtros
    const [textoFiltro, setTextoFiltro] = useState(value.gastronomicos.filtros.texto)
    const { loading: loadingProps, error: errorProps, data: dataProps } = useQuery(GET_PROPS_GASTRONOMICOS);

    const botonFiltra = () => {
        value.gastronomicos.data.map((gastronomico) => {
            if (
                (!textoFiltro || gastronomico.nombre.toLowerCase().includes(textoFiltro.toLowerCase())) &&
                (!filtros.localidades || filtros.localidades === gastronomico.localidade?.id) &&
                (!filtros.especialidades || gastronomico.especialidad_gastronomicos?.some(item => item.especialidade.id === filtros.especialidades)) &&
                (!filtros.actividad || filtros.actividad === gastronomico.actividad_gastronomicos?.some(item => item.actividade.id === filtros.actividad))
            ) {
                gastronomico.visible = true
            }
            else {
                gastronomico.visible = false
            }
        });
        value.gastronomicos.filtros.texto= textoFiltro
        setValue({ ...value });
    }

    const restablecerFiltros = () => {
        value.gastronomicos.data.map((gastronomico) => {
            gastronomico.visible = true
        })
        setTextoFiltro(null)
        for (let key in value.gastronomicos.filtros) {
            value.gastronomicos.filtros[key] = null;
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
                    <DropdownCustom data={dataProps.localidades} value={filtros.localidades} eshotel={false} />
                    <DropdownCustom data={dataProps.especialidades} value={filtros.especialidades} eshotel={false} />
                    <DropdownCustom data={dataProps.actividades} value={filtros.actividades} eshotel={false} />
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