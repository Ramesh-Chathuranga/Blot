import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../../core/library/Colors";
import { FONT_FAMILYS, selected_Font_Type, fontStyles } from "../../../core/library/Fonts";
import { TextInput } from 'react-native-paper';
import { relativeHeight } from "../../../core/library/Metrix";
// ()
export default ({
    lable = '',
    placeholder = '',
    value = '',
    errorMessage = '',
    color = Colors.textBlack,
    placeholderColor = Colors.placeholder,
    mode = 'flat',
    error = false,
    onChangeText = () => { },
    ref=null
}) => {

    return (
        <TextInput
            ref={ref}
            theme={{
                colors: {
                    primary: color
                }
            }}
            label={lable}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={onChangeText}
            mode={mode}
            style={styles.input}
            error={error}
            contentStyle={{
                ...fontStyles.CUSTOM_TEXT(
                    color,
                    'left',
                    FONT_FAMILYS[selected_Font_Type].REGULAR,
                    'normal',
                    20,
                ),
                fontWeight: '400'
            }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        marginTop: relativeHeight(20)
      },
})