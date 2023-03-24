import React from "react";
import { View } from "react-native";

export default function Linea() {
    return (
<View style={{flexDirection: 'row'}}>
    <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
</View>
    )
}