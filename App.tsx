/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import AppNavigator from './src/core/navigator/AppNavigator';
import SplashScreen from 'react-native-splash-screen'


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
 useEffect(() =>{
  console.log("()fffffffff")
  SplashScreen.hide();
 },[])

  return (
    <PaperProvider>
      <NavigationContainer>
        <AlertNotificationRoot>
          <AppNavigator />
        </AlertNotificationRoot>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
