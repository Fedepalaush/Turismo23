import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from "react";
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Context } from '../Context/context'
import RatingBar from '../Components/RatingBar'
import ComentarioComp from '../Components/ComentarioComp';
import { CREATE_COMENTARIO_MUTATION, DELETE_COMENTARIO_MUTATION } from '../Graphql/Mutations'
import { GET_COMENTARIO, GET_PUNTAJE, GET_COMENTARIOS } from '../Graphql/Querys'
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const Comentario = (props) => {
    const [comentario, setComentario] = useState('')
    const [estrellas, setEstrellas] = useState(5)
    const [idComentario, setIdComentario] = useState(null)
    const { value, setValue } = useContext(Context);
    const { loading, error, data } = useQuery(GET_COMENTARIO, {
        variables: {
            usuario: value.usuario.id,
            id_establecimiento: props.route.params.id,
            eshotel: props.route.params.eshotel
        }
    });

    const { loading: loadingComentarios, error: errorComentarios, data: dataComentarios } = useQuery(GET_COMENTARIOS, {
        variables: {
            id_establecimiento: props.route.params.id,
            eshotel: props.route.params.eshotel
        }
    });

    const [createComentario] = useMutation(CREATE_COMENTARIO_MUTATION, {
        variables: {
            usuario: value.usuario.id,
            id_establecimiento: props.route.params.id,
            eshotel: props.route.params.eshotel,
            puntaje: estrellas,
            comentario: comentario
        },
        refetchQueries: [
            {
                query: GET_COMENTARIO,
                variables: {
                    usuario: value.usuario.id,
                    id_establecimiento: props.route.params.id,
                    eshotel: props.route.params.eshotel
                },
                awaitRefetchQueries: true,
            },
            {
                query: GET_PUNTAJE,
                variables: {
                    id_establecimiento: props.route.params.id,
                    eshotel: props.route.params.eshotel
                },
            },
        ],
        onCompleted: () => {
            console.log(props)
            setComentario(null);
            
            props.navigation.navigate('Detalle', { id: props.route.params.id, hotel:props.route.params.eshotel })
        
        }
    }
    );

    const [deleteComentario] = useMutation(DELETE_COMENTARIO_MUTATION, {
        variables: { id: idComentario },
        refetchQueries: [
            {
                query: GET_COMENTARIO,
                variables: {
                    usuario: value.usuario.id,
                    id_establecimiento: props.route.params.id,
                    eshotel: props.route.params.eshotel
                },
                awaitRefetchQueries: true,
            },
        ],
    });

    const handleEstrellas = (estrellas) => {
        setEstrellas(estrellas);
    };

    function handleComentario() {
        createComentario()
    }

    function handleBorrar(comentario) {
        setIdComentario(comentario)
    }


    useEffect(() => {
        if (idComentario) {
            deleteComentario({ variables: { id: idComentario } })
            setIdComentario(null)
        }
    },
        [idComentario])

    return (
        <View>
            {loadingComentarios || loading ? (
                <Text>Cargando...</Text>
            ) : errorComentarios || error ? (
                <Text>error</Text>
            ) : (
                <View style={styles.container}>               
                    {data.comentario[0] ? (
                        <View>
                            <ComentarioComp usuario={'Comentario hecho anteriormente'} comentario={data.comentario[0].comentario}
                            puntaje={data.comentario[0].puntaje}/>
                            <Button title="Eliminar Comentario" onPress={() => handleBorrar(data.comentario[0].id)} />
                        </View>
                    ) : (
                        <View>
                            <TextInput placeholder='Ingrese un Comentario' onChangeText={text => setComentario(text)} />
                            <RatingBar estrellas={handleEstrellas} />
                            <Button onPress={() => handleComentario()} title='Comentar' />
                        </View>
                    )}
                    <View>
                        <Text style={styles.subtitulo}>Otros usuarios opinaron...</Text>

                        {dataComentarios.comentario.length > 0 ? (
                            dataComentarios.comentario.map((comentario, idx) => {
                                if (comentario.usuario.id !== value.usuario.id) {
                                    return (
                                        <View key={idx} style={styles.comentario}>
                                            <ComentarioComp
                                                usuario={comentario.usuario.nombre}
                                                comentario={comentario.comentario}
                                                puntaje={comentario.puntaje}
                                            />
                                        </View>
                                    );
                                }
                            })
                        ) : (
                            <Text>No hubo comentarios</Text>
                        )}
                    </View>
                </View>
            )}
        </View>
    );

}

export default Comentario


const styles = StyleSheet.create({
    container: {
        width:'90%',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
    },
    subtitulo:{
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'center',
        marginTop:30
    },
    usuario:{
        fontSize:15,
        fontWeight:'bold',
        color:'black'
    },
    comentario:{
        marginBottom:10
    },
})