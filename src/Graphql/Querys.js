
import { gql } from '@apollo/client';

const GET_ALOJAMIENTOS = gql`
    query hotel{
        alojamientos {
            id
            domicilio
            foto
            nombre
            lat
            lng
            localidade{
              id
                nombre
            }
            categoria {
              id
                valor
            }
            clasificacione {
              id
              nombre
            }
          }
        }
        
    `;


const GET_ALOJAMIENTO = gql`
    query hotel($id: Int!) {
    alojamientos (where: {id: {_eq: $id}}) {
      id
      domicilio  
      foto
      nombre
      lat
      lng
      localidade{
        id
        nombre
    }
    categoria {
      id
        valor
      }
      clasificacione {
        id
        nombre
      }
      }
    }
      `;

const GET_GASTRONOMICO = gql`
    query gastronomico($id: Int!) {
    gastronomicos (where: {id: {_eq: $id}}) {
      id
      domicilio  
      foto
      nombre
      lat
      lng
      localidade {
        id
        nombre
      }
      especialidad_gastronomicos {
        especialidade {
          nombre
          id
        }
      }
      actividad_gastronomicos {
        actividade {
          nombre
          id
        }
      }
     
      }
    }
      `;


const GET_PROPS_ALOJAMIENTOS = gql`
        query alojamientos {
          
            localidades {
                id
                nombre
              }
              categorias {
                id
                estrellas
              }
              clasificaciones {
                id
                nombre
              }
           
          }
      `;

const GET_PROPS_GASTRONOMICOS = gql`
query gastronomicos {
  
    localidades {
        id
        nombre
      }
      actividades {
        id
        nombre
      }
      especialidades {
        id
        nombre
      }
   
  }
`;


const GET_GASTRONOMICOS = gql`
      {
           gastronomicos {
              id
              domicilio
              foto
              nombre
              lat
              lng
              localidade{
                  id
                  nombre
              }
              especialidad_gastronomicos {
                especialidade {
                  nombre
                  id
                }
              }
              actividad_gastronomicos {
                actividade {
                  nombre
                  id
                }
              }

            }
          }
      `;


const GET_USUARIO = gql`
    query usuario($usuario: String!) {
      usuarios(where: {usuario: {_eq: $usuario}}) {
      id
      nombre
      apellido
      usuario
      password
      }
    }
      `;

const GET_FAVORITOS = gql`
    query favorito($usuario: Int!) {
      favoritos(where: {usuario: {_eq: $usuario}}) {
     establecimiento
     eshotel
     id
      }
    }
      `;

const GET_RECUERDOS = gql`
      query recuerdo($usuario: Int!, $establecimiento: Int!, $eshotel: Boolean!) {
        recuerdos(where: {usuario: {_eq: $usuario}, establecimiento: {_eq: $establecimiento }, eshotel:{_eq: $eshotel }}) {
       foto
       id
        }
      }
        `;

const GET_COMENTARIO = gql`
        query comentario($usuario: Int!, $id_establecimiento: Int!, $eshotel: Boolean!) {
          comentario(where: {usuario: {id: {_eq: $usuario}}, id_establecimiento: {_eq: $id_establecimiento}, eshotel: {_eq: $eshotel}}) {
            id
            puntaje
            comentario
              }
        }
          `;

const GET_COMENTARIOS = gql`
          query comentario( $id_establecimiento: Int!, $eshotel: Boolean!) {
            comentario(where: {id_establecimiento: {_eq: $id_establecimiento}, eshotel: {_eq: $eshotel}}) {
              id
              puntaje
              comentario
              usuario{
                id
                nombre
              }
                }
          }
            `;

const GET_PUNTAJE = gql`
          query puntaje($id_establecimiento: Int!, $eshotel: Boolean!) {
            comentario(where: {id_establecimiento: {_eq: $id_establecimiento}, eshotel: {_eq: $eshotel}}) {  
              puntaje     
                }
          }
            `;

const GET_MENSAJES = gql`
    subscription {
      mensajes{
        id_mensaje
        mensaje
        usuario
        usuarioByUsuario {
          usuario
        }
        
      }
    }
  `;

export {
  GET_ALOJAMIENTOS,
  GET_ALOJAMIENTO,
  GET_GASTRONOMICOS,
  GET_GASTRONOMICO,
  GET_COMENTARIO,
  GET_COMENTARIOS,
  GET_PROPS_ALOJAMIENTOS,
  GET_PROPS_GASTRONOMICOS,
  GET_USUARIO,
  GET_PUNTAJE,
  GET_RECUERDOS,
  GET_FAVORITOS,
  GET_MENSAJES,
};
