import React from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useState } from 'react'

const RatingBar = (props) => {
    const [puntajeInicial, setPuntajeInicial] = useState(5)
    const [rating, setRating] = useState([1, 2, 3, 4, 5])
    const estrellaBlanca = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
    const estrellaPintada = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'

    return (
        <View style={styles.container}>
            <View style={styles.customRatingBar}>
                {rating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => {
                                setPuntajeInicial(item);
                                props.estrellas(item)
                            }}
                        >
                            <Image
                                style={styles.starImagen}
                                source={
                                    item <= puntajeInicial
                                        ? { uri: estrellaPintada }
                                        : { uri: estrellaBlanca }
                                }
                            />
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <Text>
                {puntajeInicial + ' / ' + rating.length}
            </Text>
        </View>
    )
}

export default RatingBar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    customRatingBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    starImagen: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    }
})


