import * as React from 'react';
import 'react-native-gesture-handler'
import { WebSocketServer } from 'ws';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApolloProvider } from '@apollo/client';
import client from './src/Graphql/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
/* import typeDefs from "./src/Graphql/Querys" */
import MyDrawer from './src/MyDrawer/index.js';
import { Context } from './src/Context/context';


function App() {
const [value, setValue] = useState({
  alojamientos:{
    data:[],
    filtros:{
      localidades:null,
      categorias:null,
      clasificaciones:null,
      texto:null,
      condicion:null
    }
  },
  gastronomicos:{
    data:[],
    filtros:{
      localidades:null,
      especialidades:null,
      actividades:null,
      texto:null,
      condicion:null

    }
  },
  usuario: {
    id:'',
    nombre:'',
    apellido:'',
    usuario:'',
    password: '',
    favoritos:[]
  }
  })

 
  return (
    <Context.Provider value={{value, setValue}}>
      <ApolloProvider client={client}>
        <MyDrawer/>
      </ApolloProvider>
    </Context.Provider>
  )
}
export default App;
