import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_ALOJAMIENTO, GET_GASTRONOMICO } from '../Graphql/Querys';
import Info from '../Components/Info';

const Detalle = (props) => {
    const tipo = props.route.params.hotel
    const identificador = props.route.params.id

 
    let loading = null;
    let error = null;
    let data = null;
  
    if (tipo) {
        ({ loading, error, data } = useQuery(GET_ALOJAMIENTO, { variables: { id: identificador } }));
    } else {
        ({ loading, error, data } = useQuery(GET_GASTRONOMICO, { variables: { id: identificador } }));
    }


    const renderItem = ({ item }) => (
        <View>
            <Info item={item} hotel={tipo} />
        </View>
    );

    return (
        <View>
            {loading ? (
                <Text>Cargando...</Text>
            ) : error ? (
                <Text>error</Text>

            ) : (
                <View>      
                    <FlatList
                        initialNumToRender={1}
                        windowSize={1}
                        data={tipo? data.alojamientos : data.gastronomicos}
                        ListEmptyComponent={< Text > Lista vacía </Text>}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )
            }
        </View>
    )
}



export default Detalle