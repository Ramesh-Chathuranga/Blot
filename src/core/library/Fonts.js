import { Platform, StyleSheet } from "react-native";
import { getScaledValue } from "./Metrix";

const selected_Font_Type = 'Roboto';

const Roboto = {
    REGULAR: 'Roboto-Regular',
    Italic: 'Roboto-Italic',
    Thin: 'Roboto-Thin',
    ThinItalic: 'Roboto-ThinItalic',
    ExtraLight: 'Roboto-ExtraLight',
    ExtraLightItalic: 'Roboto-ExtraLightItalic',
    LIGHT: 'Roboto-Light',
    LightItalic: 'Roboto-LightItalic',
    Medium: 'Roboto-Medium',
    MediumItalic: 'Roboto-MediumItalic',
    SemiBold: 'Roboto-SemiBold',
    SemiBoldItalic: 'Roboto-SemiBoldItalic',
    Bold: 'Roboto-Bold',
    BoldItalic: 'Roboto-BoldItalic',
    ExtraBold: 'Roboto-ExtraBold',
    ExtraBoldItalic: 'Roboto-ExtraBoldItalic',
    Black: 'Roboto-Black',
    BlackItalic: 'Roboto-BlackItalic',
    default: 'Roboto-Regular',
};




const FONT_FAMILYS = {
    Roboto,
}


const fontStyles = StyleSheet.create({

    HEADER: (color = '#ffffff', textAlign = 'center') => ({
        color,
        fontFamily:FONT_FAMILYS[selected_Font_Type].default,
        fontStyle:'normal',
        fontWeight:'600',
        textAlign,
        fontSize: getScaledValue(Platform.isPad ? 18 : 25),
    }),

    

    CUSTOM_TEXT: ( color = '#ffffff', textAlign = 'center', fontFamily = FONT_FAMILYS[selected_Font_Type].REGULAR, fontStyle = 'normal', fontSize = 12 ) => ({
        color,
        fontFamily,
        fontStyle,
        textAlign,
        fontSize: getScaledValue(Platform.isPad ? fontSize - 6 : fontSize),
    }),
});

export { fontStyles, FONT_FAMILYS, selected_Font_Type }

