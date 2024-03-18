// In Navigation.tsx or a new file dedicated to your Tab Navigator

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

// Import stack navigators for each tab (defined below)
import SwipeStack from "@/screens/main/swipe/SwipeStack";
import ProfileStack from "@/screens/main/profile/ProfileStack";
import UpcomingDateStack from "@/screens/main/upcoming-date/UpcomingDateStack";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const mainOptions = {
    headerShown: false,
    animationTypeForReplace: "push",
    animation: "slide_from_right",
    tabBarShowLabel: false,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({
          focused,
          color,
        }: {
          focused: boolean;
          color: string;
        }) => {
          let iconName:
            | "heart"
            | "heart-half-outline"
            | "person-circle"
            | "person-circle-outline"
            | "calendar"
            | "calendar-outline"
            | undefined;
          if (route.name === "Discover") {
            iconName = focused ? "heart" : "heart-half-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle-outline" : "person-circle";
          } else if (route.name === "Dates") {
            iconName = focused ? "calendar" : "calendar-outline";
          }
          return <Ionicons name={iconName} size={36} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Discover"
        component={SwipeStack}
        options={mainOptions}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={mainOptions}
      />
      <Tab.Screen
        name="Dates"
        component={UpcomingDateStack}
        options={mainOptions}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
