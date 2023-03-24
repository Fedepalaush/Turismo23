import React from "react"
import { View, Text, FlatList, StyleSheet, Button } from "react-native"
import { useState, useContext } from "react";
import { Context } from "../Context/context"
import Hotel from "../Components/Hotel"
import OverlayFiltrosAlojamiento from "../Components/OverlayFiltrosAlojamientos";

const HotelesLista = (props) => {
    const { value, setValue } = useContext(Context);
    const [visible, setVisible] = useState(false)
    const filtroHotel = value.alojamientos.filtros
    const filtroActiveH = getFiltro(filtroHotel)

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const renderItem = ({ item }) => (
        <View>
            {item.visible && (
                <Hotel item={item} />
            )}
        </View>
    );

    function getFiltro (filtro){
        return Object.values(filtro).some(value => value !== null);
      }

    return (
        <View>
            <View>
            </View>
            <View>
                <Button color={'black'} title={filtroActiveH ? "Filtros ✅" : "Filtros"} onPress={toggleOverlay} />
                <OverlayFiltrosAlojamiento visible={visible} closeOverlay={toggleOverlay} />
                <FlatList
                    contentContainerStyle={{ paddingBottom: 160 }}
                    initialNumToRender={3}
                    windowSize={3}
                    data={value.alojamientos.data}
                    ListEmptyComponent={< Text > Lista vacía </Text>}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}
export default HotelesLista;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 'auto',

    },
    boton: {
        color: 'black'
    }
})