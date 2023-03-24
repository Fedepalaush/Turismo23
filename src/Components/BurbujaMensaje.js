import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const BurbujaMensaje = ({ mensaje, usuario, isMe }) => {
  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <View style={[styles.bubble, isMe ? styles.rightBubble : styles.leftBubble]}>
        <Text style={styles.nombre}>{usuario}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  leftContainer: {
    justifyContent: 'flex-start',
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  nombre:{
    fontWeight:'500',
    color:'black',
    fontSize:15
  },
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  leftBubble: {
    backgroundColor: '#B5B2B2',
  },
  rightBubble: {
    backgroundColor: '#DCF8C6',
  },
  message: {
    fontSize: 16,
    color: '#333333',
  },
});

export default BurbujaMensaje;