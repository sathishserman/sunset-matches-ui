import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProposeLocation from "./ProposeLocation"; // Your main swipe screen
import OtherDateStack from "./OtherDateStack"; // The "It's a Match" screen

const Stack = createNativeStackNavigator();

function SwipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectLocation"
        component={ProposeLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PendingDates"
        component={OtherDateStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SwipeStack;
