import React, { useState, useRef } from "react"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from "react-native";
import Colors from "../../core/library/Colors";
import { FONT_FAMILYS, selected_Font_Type, fontStyles } from "../../core/library/Fonts";
import { TextInput, Button } from 'react-native-paper';
import { CustomTexttInput, ScreenContainer } from "../../components";
import { relativeHeight, relativeWidth } from "../../core/library/Metrix";
import { InputType } from "../../core/library/Constant";
import Arrow from "../../../assets/ChevronRight.png"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const LegalNameScreen = () => {
  const [value, setValue] = useState({ firstName: '', lastName: '' });
  const [error, setError] = useState({ firstName: false, lastName: false });
  const [valid, setValid] = useState({ firstName: false, lastName: false });
  const navigation = useNavigation();

  const onHandle = (text, type) => {
    setValue((prev) => ({ ...prev, [type]: text }))
    setValid((prev) => ({ ...prev, [type]: text.trim().length > 0 }))
    setError({ firstName: false, lastName: false })
  };

  const onPress = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
      navigation.navigate("BlotScreen");
    } catch (e) {
      // saving error
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Storage Error',
        textBody: "Failed to save data. Please try again.",
      })
    }

  }
  return (
    <ScreenContainer
      headerText="Your legal name"
      height={102}
      backgroundColor={Colors.white}
      isHideLeft
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.descriptionBox}>
          <Text style={[
            fontStyles.CUSTOM_TEXT(
              Colors.textGrey,
              'left',
              FONT_FAMILYS[selected_Font_Type].REGULAR,
              'normal',
              16,
            ),
            styles.textStyle,
          ]}>
            We need to know a bit about you so that we can create your account.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomTexttInput
            placeholder="First name"
            value={value.firstName}
            onChangeText={(text) => onHandle(text, InputType.FIRST_NAME)}

          />

          <CustomTexttInput
            placeholder="Last name"
            value={value.lastName}
            onChangeText={(text) => onHandle(text, InputType.LAST_NAME)}
          />

        </View>
        <View>
          <TouchableOpacity onPress={onPress} style={styles.circleButton(!(valid.firstName && valid.lastName))}>
            <Image source={Arrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  descriptionBox: {
    marginVertical: relativeHeight(20)
  },
  textStyle: {
    fontWeight: '400',
    lineHeight: relativeHeight(24)
  },

  inputContainer: {
    gap: 10,
  },

  circleButton: (disabled) => ({
    width: relativeWidth(56),
    height: relativeWidth(56),
    borderRadius: relativeWidth(56),
    backgroundColor: Colors.purple,
    opacity: disabled ? 0.4 : 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: relativeHeight(174)
  }),

  arrow: {
    height: relativeWidth(24),
    width: relativeWidth(24),
    resizeMode: 'contain'
  }
});

export default LegalNameScreen;