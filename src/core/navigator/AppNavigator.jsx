import React, { useState } from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { View, Text } from "react-native";
import { LegalNameScreen, BlotScreen, DashboardScreen } from "../../modules";




const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        resrSpeedThreshold: 0.01
    }
}

const MainStack = createStackNavigator();

export default ({ }) => {
    return (
        < MainStack.Navigator
            initialRouteName=" LegalNameScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                }

            }}
        >
            <MainStack.Screen name=" LegalNameScreen" component={LegalNameScreen} />
            <MainStack.Screen name="BlotScreen" component={BlotScreen} />
            <MainStack.Screen name="DashboardScreen" component={DashboardScreen} />
        </ MainStack.Navigator>
    );
}

