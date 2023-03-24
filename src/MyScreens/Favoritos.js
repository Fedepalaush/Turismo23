import React from 'react'
import { Text, View, Image, Button, FlatList } from 'react-native'
import { useContext } from "react";
import { Context } from "../Context/context"
import Restaurante from "../Components/Restaurante"
import Hotel from "../Components/Hotel"


const Favoritos = () => {
    const { value, setValue } = useContext(Context);


    function getHotelesFav() {

        const hotelesFav = value.usuario.favoritos.filter((alojamiento) => alojamiento.eshotel);


        const hoteles = value.alojamientos.data.filter((hotel) => {
            return hotelesFav.some((hotelFav) => hotel.id === hotelFav.establecimiento);
        })
        return hoteles
    }

    function getGastronomicosFav() {

        const GastronomicosFav = value.usuario.favoritos.filter((gastronomico) => !gastronomico.eshotel);

        const gastronomicos = value.gastronomicos.data.filter((gastronomico) => {
            return GastronomicosFav.some((gastronomicoFav) => gastronomico.id === gastronomicoFav.establecimiento);
        })
        return gastronomicos
    }

    function getFavoritos() {
        const hoteles = getHotelesFav();
        const gastronomicos = getGastronomicosFav();
        const favoritos = hoteles.concat(gastronomicos);
        return favoritos;
    }

    const renderItem = ({ item }) => (

        <View>
            {item.__typename === 'alojamientos' ? (
                item.visible && <Hotel item={item} />
            ) : (
                item.visible && <Restaurante item={item} />
            )}
        </View>
    );

    return (
        <View>
            <View>

                <FlatList
                    contentContainerStyle={{ paddingBottom: 160 }}
                    initialNumToRender={3}
                    windowSize={3}
                    data={getFavoritos()}
                    ListEmptyComponent={< Text > Lista vacía </Text>}
                    renderItem={renderItem}
                    keyExtractor={item => item.nombre}
                />
            </View>
        </View>
    )
}

export default Favoritos