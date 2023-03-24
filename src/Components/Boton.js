import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Boton(props) {
  const color = props.color ? props.color : '#6D214F';

  return (
    <TouchableOpacity onPress={props.myOnPress}>
     <View style={[styles.button, { backgroundColor: color }]}>
        <Text style={styles.text}>{props.titulo}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D214F',
    borderRadius: 50,
    width: 85,
    height: 35,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});