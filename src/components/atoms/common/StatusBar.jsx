import React from "react";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { STATUSBAR_HEIGHT } from "../../../core/library/Metrix";


export default ({ backgroundColor,height, ...props}) => {
    return (
        <View style={[styles.statusBar(height), { backgroundColor }]}>
            <StatusBar animated={true} translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const styles= StyleSheet.create({
    statusBar:(height)=>({
      height:height>0? STATUSBAR_HEIGHT:height,
    }),
  });