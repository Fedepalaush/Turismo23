import React from "react"
import { View, Text, FlatList, Button } from "react-native"
import Restaurante from "../Components/Restaurante"
import { useContext, useState } from "react";
import { Context } from "../Context/context"
import OverlayFiltrosGastr from "../Components/OverlayFiltrosGastr";

const RestaurantesLista = () => {

    const { value, setValue } = useContext(Context);
    const [visible, setVisible] = useState(false)
    const filtroRestaurante = value.gastronomicos.filtros
    const filtroActiveR = getFiltro(filtroRestaurante)

    const renderItem = ({ item }) => (
        <View>
            {item.visible && (
                <Restaurante item={item} />
            )}
        </View>
    );

    const toggleOverlay = () => {
        setVisible(!visible);
    };


    function getFiltro (filtro){
        return Object.values(filtro).some(value => value !== null);
      }

      
    return (
        <View>
           <Button color={'black'} title={filtroActiveR ? "Filtros ✅" : "Filtros"} onPress={toggleOverlay} />
            <OverlayFiltrosGastr visible={visible} closeOverlay={toggleOverlay} />
            <View>
                <FlatList
                    initialNumToRender={25}
                    windowSize={10}
                    data={value.gastronomicos.data}
                    ListEmptyComponent={< Text > Lista vacía </Text>}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    )
}
export default RestaurantesLista;