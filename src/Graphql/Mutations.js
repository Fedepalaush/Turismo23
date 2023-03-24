import { gql } from '@apollo/client';

const CREATE_CATEGORIA_MUTATION = gql`
mutation create_categoria ($id: Int!, $estrellas: String!, $valor: Int!) {
  insert_categorias_one(object:{id: $id, estrellas: $estrellas, valor: $valor}) {
    id
  }
} 
`;

const CREATE_USUARIO_MUTATION = gql`
mutation create_usuario ( $nombre:String!, $apellido:String! $usuario: String!, $password: String!) {
  insert_usuarios_one(object:{ nombre:$nombre, apellido:$apellido, usuario: $usuario, password: $password}) {
    usuario
  }
} 
`;

const CREATE_RECUERDO_MUTATION = gql`
mutation create_recuerdo ($usuario: Int!, $establecimiento: Int!, $eshotel: Boolean!, $foto:String!) {
  insert_recuerdos_one(object:{usuario: $usuario, establecimiento: $establecimiento, eshotel:$eshotel, foto:$foto}) {
    usuario
  }
}
`;

const CREATE_FAVORITO_MUTATION = gql`
mutation create_favorito ($usuario: Int!, $establecimiento: Int!, $eshotel:Boolean!) {
  insert_favoritos_one(object:{ usuario: $usuario, establecimiento: $establecimiento, eshotel: $eshotel}) {
    usuario
  }
}
`;

const CREATE_COMENTARIO_MUTATION = gql`
mutation create_comentario ($usuario: Int!, $id_establecimiento: Int!, $eshotel:Boolean!, $comentario:String!, $puntaje:Int! ) {
  insert_comentario_one(object:{ usuario_id: $usuario, id_establecimiento: $id_establecimiento, eshotel: $eshotel, comentario:$comentario, puntaje:$puntaje}) {
    usuario_id
  }
}
`;

const DELETE_FAVORITO_MUTATION = gql`
mutation delete_favorito($usuario: Int!, $establecimiento: Int!, $eshotel:Boolean!) {
  delete_favoritos(where: {usuario:{_eq:$usuario}, establecimiento:{_eq: $establecimiento}, eshotel:{_eq: $eshotel}}){
    affected_rows
  }
}
`;
const DELETE_COMENTARIO_MUTATION = gql`
mutation delete_comentario($id: Int!) {
  delete_comentario(where: {id:{_eq:$id}}){
    affected_rows
  }
}
`;
const DELETE_RECUERDO_MUTATION = gql`
mutation delete_recuerdo($id: Int!){
  delete_recuerdos(where: {id:{_eq:$id}}){
    affected_rows
  }
}
`;

 const POST_MESSAGE = gql`
 mutation create_mensaje ($usuario: Int!, $mensaje: String!) {
  insert_mensajes_one(object:{mensaje: $mensaje , usuario: $usuario}) {
    id_mensaje
  }
}
`; 

const UPDATE_USER = gql`
mutation update_user($id: Int!, $usuario: String!, $nombre: String!, $apellido: String!) {
  update_usuarios_by_pk(pk_columns: {id: $id}, _set: {nombre: $nombre, apellido: $apellido, usuario:$usuario}) {
    id
  }
}
  `; 

const UPDATE_PASS = gql`
mutation update_contra($id: Int!, $password:String!) {
  update_usuarios_by_pk(pk_columns: {id: $id}, _set: {password:$password}) {
    id
  }
}
`;

export {
CREATE_CATEGORIA_MUTATION,
CREATE_USUARIO_MUTATION,
CREATE_RECUERDO_MUTATION,
CREATE_COMENTARIO_MUTATION,
DELETE_FAVORITO_MUTATION,
DELETE_RECUERDO_MUTATION,
DELETE_COMENTARIO_MUTATION,
POST_MESSAGE, 
CREATE_FAVORITO_MUTATION,
UPDATE_USER,
UPDATE_PASS,
  };
