import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSwipeScreen from "./MainSwipeScreen"; // Your main swipe screen
import MatchScreen from "./MatchScreen"; // The "It's a Match" screen
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function SwipeStack() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      e.preventDefault();
      navigation.navigate("Discover", {
        screen: "MainSwipe",
      });
    });

    return unsubscribe;
  }, [navigation]);

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
