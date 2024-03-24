import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditProfileScreen from "./EditProfileScreen";
import ViewProfileScreen from "./ViewProfileScreen";
import ProfileHeader from "./ProfileHeader";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="ViewProfileScreen" component={ViewProfileScreen} />
      <Tab.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Tab.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileTabs"
        component={ProfileTabs}
        options={({ navigation }: { navigation: any }) => ({
          headerShown: true,
          header: () => <ProfileHeader navigation={navigation} />,
          animtion: "slide_from_right",
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
