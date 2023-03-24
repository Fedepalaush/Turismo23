import React, { useState, useEffect } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { useContext } from 'react';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { Context } from '../Context/context';

  const DropdownCustom = (props) => {
    const [valor, setValor] = useState(props.value);
    const {value, setValue} = useContext(Context);
    const [isFocus, setIsFocus] = useState(false);
    const tipo = props.data[0].__typename

    useEffect(() => {
      if (valor) {
        props.eshotel
        ? value.alojamientos.filtros[tipo] = valor
        : value.gastronomicos.filtros[tipo] = valor;
        setValue({ ...value });
      }
    }, [valor, props.presionado]);

    
    const renderLabel = () => {
      return (valor || isFocus) && (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown
        </Text>
      );
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
          search
          maxHeight={300}
          labelField= {tipo === "categorias" ? "estrellas" : "nombre"}
          valueField="id"
          placeholder={!isFocus ? tipo : '...'}
          searchPlaceholder="Buscar..."
          value={valor}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValor(item.id);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownCustom;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });