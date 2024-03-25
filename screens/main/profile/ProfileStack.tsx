import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfileScreen from "./EditProfileScreen";
import ProfileHeader from "./ProfileHeader";
import ViewProfileScreen from "./ViewProfileScreen";

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
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
