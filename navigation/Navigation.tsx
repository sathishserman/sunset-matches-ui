import React, { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { InitialScreenOnStart } from "./InitialScreenOnStart";
import { Italiana_400Regular, useFonts } from "@expo-google-fonts/italiana";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function Navigation() {
  let [fontsLoaded] = useFonts({
    Italiana_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="InitialScreenOnStart">
        <Stack.Screen
          name="InitialScreenOnStart"
          component={InitialScreenOnStart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
