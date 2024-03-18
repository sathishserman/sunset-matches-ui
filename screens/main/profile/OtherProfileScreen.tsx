import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtherProfileScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView className="flex-1 bg-[#411400]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          justifyContent: "space-between",
        }}
        style={{
          marginBottom: tabBarHeight + 10,
        }}
      >
        <Text>OtherProfileScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
