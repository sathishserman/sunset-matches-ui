import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSwipeScreen from "./MainSwipeScreen"; // Your main swipe screen
import MatchScreen from "./MatchScreen"; // The "It's a Match" screen

const Stack = createNativeStackNavigator();

function SwipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainSwipe"
        component={MainSwipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SwipeStack;
