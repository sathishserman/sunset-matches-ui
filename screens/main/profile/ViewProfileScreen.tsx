import React from "react";
import { View, Text, Pressable } from "react-native";

export default function ViewProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#411400] items-center justify-between">
      <View className="bg-teal-200">
        <Text className="text-3xl text-white">ViewProfileScreen</Text>
        <Pressable
          className="bg-red-400 p-1 rounded-lg px-2 mt-3"
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Text className="text-white">Edit</Text>
        </Pressable>
      </View>
      <View className="bg-yellow-300 h-1 w-full"></View>
    </View>
  );
}
