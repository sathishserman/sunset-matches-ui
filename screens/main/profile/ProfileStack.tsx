import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainProfileScreen from "./MainProfileScreen"; // Your main swipe screen
import OtherProfileScreen from "./OtherProfileScreen";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OtherProfileScreen"
        component={OtherProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainProfileScreen"
        component={MainProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
