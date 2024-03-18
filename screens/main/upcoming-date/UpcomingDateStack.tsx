import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainDateStack from "./MainDateStack"; // Your main swipe screen
import OtherDateStack from "./OtherDateStack"; // The "It's a Match" screen

const Stack = createNativeStackNavigator();

function SwipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainSwipe"
        component={MainDateStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Match"
        component={OtherDateStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SwipeStack;
