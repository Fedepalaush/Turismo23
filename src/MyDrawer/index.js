import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext } from 'react';
import { Context } from "../Context/context"
import { useState, useEffect } from 'react';

import HotelesLista from '../MyScreens/HotelesLista';
import RestaurantesLista from '../MyScreens/RestaurantesLista';
import Detalle from '../MyScreens/Detalle';
import Camara from '../MyScreens/Camara';
import Chat from '../MyScreens/Chat';
import Login from '../MyScreens/Login';
import Registro from '../MyScreens/Registro';
import Mapa from '../MyScreens/Mapa';
import Principal from '../MyScreens/Principal';
import Logout from '../MyScreens/Logout';
import Favoritos from '../MyScreens/Favoritos';
import Recuerdos from '../MyScreens/Recuerdos';
import ModificarUsuario from '../MyScreens/ModificarUsuario';
import CambioContra from '../MyScreens/CambioContra';
import Comentario from '../MyScreens/Comentario';

function InicioScreen(props) {
  const [text, setText] = useState('')

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Principal />
    </View>

  );
}
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  const { value, setValue } = useContext(Context);
  const [usuario, setUsuario] = useState(value.usuario.nombre)

  useEffect(() => {
  }
  ), [value];

  return (
    <NavigationContainer>
      <Drawer.Navigator backBehavior='order'>
        {value.usuario.id ? (
          <>
            <Drawer.Screen name="Inicio" component={InicioScreen} />
            <Drawer.Screen name="Hoteles" component={HotelesLista} />
            <Drawer.Screen name="Favoritos" component={Favoritos} />
            <Drawer.Screen name="Restaurantes" component={RestaurantesLista} />
            <Drawer.Screen name="Detalle" component={Detalle} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Camara" component={Camara} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Chat" component={Chat} />
            <Drawer.Screen name="Mapa" component={Mapa} />
            <Drawer.Screen name="Recuerdos" component={Recuerdos} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Comentario" component={Comentario} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Modificar Usuario" component={ModificarUsuario} />
            <Drawer.Screen name="Cambio Contra" component={CambioContra} />
            <Drawer.Screen name="Logout" component={Logout} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={Login} options={{
                  drawerItemStyle: { display: 'none' }
        }} />
            <Drawer.Screen name="Registro" component={Registro} options={{
                  drawerItemStyle: { display: 'none' }
        }}/>
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>

  );
}
export default MyDrawer