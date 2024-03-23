import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditProfileScreen from "./EditProfileScreen";
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
      <Tab.Screen name="ViewProfile" component={ViewProfileScreen} />
      <Tab.Screen name="EditProfile" component={EditProfileScreen} />
    </Tab.Navigator>
  );
}

function ProfileHeader({ navigation }: { navigation: any }) {
  const [selectedTab, setSelectedTab] = useState("view");

  useEffect(() => {
    navigation.navigate(selectedTab === "view" ? "ViewProfile" : "EditProfile");
  }, [selectedTab, navigation]);

  return (
    <SafeAreaView className="bg-[#411400] px-4">
      <View className="flex-row items-center justify-between ">
        <View className="items-center justify-center ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center ">
          <Text className="text-white text-xl font-bold">My profile</Text>
        </View>
        <View className=""></View>
      </View>
      <View className="flex-row justify-end">
        <TouchableOpacity
          onPress={() => setSelectedTab("view")}
          className="px-2 py-1"
        >
          <Text
            className={`text-white ${
              selectedTab === "view" ? "font-bold" : ""
            }`}
          >
            View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("edit")}
          className="px-2 py-1"
        >
          <Text
            className={`text-white ${
              selectedTab === "edit" ? "font-bold" : ""
            }`}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
