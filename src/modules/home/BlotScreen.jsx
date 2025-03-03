import React, { useState, useRef } from "react"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from "react-native";
import Colors from "../../core/library/Colors";
import { FONT_FAMILYS, selected_Font_Type, fontStyles } from "../../core/library/Fonts";
import { TextInput, Button } from 'react-native-paper';
import { CustomTexttInput, ScreenContainer } from "../../components";
import { relativeHeight, relativeWidth } from "../../core/library/Metrix";
import { InputType } from "../../core/library/Constant";
import Icon from "../../../assets/Icon.png"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { requestPushNotification } from "../../core/helper/PushNotificationHelper";
import { useNavigation } from "@react-navigation/native";


const BlotScreen = () => {
const navigation = useNavigation()
    const onPress = () => {
        requestPushNotification()
        navigation.navigate("DashboardScreen")
     }

    return (
        <ScreenContainer
            isHeaderSHow={false}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
                <Image source={Icon} style={styles.image} />
                <View style={styles.descriptionBox}>
                    <Text style={[
                        fontStyles.CUSTOM_TEXT(
                            Colors.textBlack,
                            'center',
                            FONT_FAMILYS[selected_Font_Type].REGULAR,
                            'normal',
                            24,
                        ),
                        styles.title
                    ]}>
                        Get the most out of Blott ✅
                    </Text>
                </View>
                <View style={styles.descriptionBox}>
                    <Text style={[
                        fontStyles.CUSTOM_TEXT(
                            Colors.textGrey,
                            'center',
                            FONT_FAMILYS[selected_Font_Type].REGULAR,
                            'normal',
                            16,
                        ),
                        styles.textStyle,
                    ]}>
                        Allow notifications to stay in the loop with your payments, requests and groups.
                    </Text>
                </View>

                <View>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text style={[
                            fontStyles.CUSTOM_TEXT(
                                Colors.white,
                                'center',
                                FONT_FAMILYS[selected_Font_Type].REGULAR,
                                'normal',
                                16,
                            ),
                            styles.buttonText,
                        ]}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        marginTop: relativeHeight(270),
        alignItems: 'center'
    },
    title: {
        fontWeight: '700',
        marginTop: 20
    },
    descriptionBox: {
        marginVertical: relativeHeight(10)
    },
    textStyle: {
        fontWeight: '400',
        lineHeight: relativeHeight(24)
    },

    image: {
        height: relativeWidth(88),
        width: relativeWidth(88),
        resizeMode: 'contain',
        backgroundColor: Colors.grey
    },

    button: {
        width: relativeWidth(327),
        height: relativeWidth(48),
        borderRadius: relativeWidth(56),
        backgroundColor: Colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: relativeHeight(Platform.isPad? 188:250),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '500'
    }

});

export default BlotScreen;