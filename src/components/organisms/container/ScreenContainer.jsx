import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { Header } from "../header";
import { StatusBar } from "../../atoms";
import { relativeWidth } from "../../../core/library/Metrix";
import Colors from "../../../core/library/Colors";



export default ({
    isTab = false,
    children = null,
    isHeaderArrowShow = true,
    headerText = '',
    isHeaderSHow = true,
    backgroundColor = Colors.whiteLightBlue,
    paddingHorizontal = 24,
    height = 200,
    paddingBottom = 80,
    isDarkContent=true,
    isHideLeft=false,
    headerTextColor= Colors.textBlack
}) => {
    return (
        <View style={isTab ? { backgroundColor } : styles.container(backgroundColor)}>
            <StatusBar
                backgroundColor={Colors.transparent}
                barStyle={isDarkContent?'light-content' :'dark-content'}
                height={0} />
            {isHeaderSHow ? <Header
                backgroundColor={backgroundColor}
                isShadow={isHeaderArrowShow}
                headerTextColor={headerTextColor}
                headerText={headerText}
                isHideLeft={isHideLeft}
                paddingBottom={paddingBottom}
                height={height}
                paddingHorizontal={paddingHorizontal}
            /> : null}
            <View style={styles.subContainer(paddingHorizontal)}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (backgroundColor) => ({
        flex: 1,
        backgroundColor,
    }),
    subContainer: (paddingHorizontal) => ({
        width: '100%',
        paddingHorizontal: relativeWidth(paddingHorizontal)
    })
});

