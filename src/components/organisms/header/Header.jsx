import React, { Children, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

import {
  getScaledValue,
  relativeHeight,
  relativeWidth,
  SCREEN_WIDTH,
} from '../../../core/library/Metrix';
import _ from 'lodash';
import {
  fontStyles, FONT_FAMILYS, selected_Font_Type
} from '../../../core/library/Fonts';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../core/library/Colors';


export default ({
  headerText = '',
  backgroundColor = Colors.white,
  isShadow = false,
  height = 104,
  paddingBottom = 80,
  paddingHorizontal =24,
  isHideLeft = false,
  headerTextColor = Colors.textBlack,
}) => {
  const navigation = useNavigation();

  console.log(headerText, "lklljł,he", height)
  return (
    <>
      <View
        style={styles.headerContainer(
          backgroundColor,
          height,
          paddingBottom,
          paddingHorizontal,
        )}>

        {isHideLeft ? null : <TouchableOpacity
          disabled={!isShadow}
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.header(0.2)]}>

          <View style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            borderStyle: "solid",
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialIcons name={"keyboard-backspace"} size={22} Colors={Colors.textBlack}/>

          </View>

        </TouchableOpacity>}


        <View style={styles.header(isHideLeft ? 1 : 0.8)}>
          <View>
            <Text
              style={[
                fontStyles.CUSTOM_TEXT(
                  headerTextColor,
                  'left',
                  FONT_FAMILYS[selected_Font_Type].REGULAR,
                  'normal',
                  30,
                ),
                styles.headerTitleStyle,
              ]}>
              {headerText}
            </Text>
          </View>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: (
    backgroundColor,
    height,
    paddingBottom,
    paddingHorizontal,
  ) => ({
    height: relativeHeight(height),
    flexDirection: 'row',
    paddingHorizontal: relativeWidth(paddingHorizontal),
    width: '100%',
    backgroundColor,
    marginTop:Platform.OS=='android'? relativeHeight(10): 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  }),

  headerTitleStyle: {
    fontWeight: '700',
    lineHeight: relativeHeight(37)
  },

  header: flex => ({
    flex,
    alignSelf: 'flex-start',
    height: relativeHeight(50),
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: relativeHeight(60),
  }),
});
