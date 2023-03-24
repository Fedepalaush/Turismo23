import React from 'react'
import {  View, Image, StyleSheet } from 'react-native'

const Estrellas = (props) => {

  const list = []
  for (let i = 0; i < props.categoria; i++) {
    list.push(<Image source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' }}
      style={styles.star}
      key={i}
    />)
  }

  return (
    <View style={styles.stars}>{list}</View>
  )
}
export default Estrellas

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  star: {
    width: 20,
    height: 20
  },
  stars: {
    flexDirection: 'row',

  }
})  