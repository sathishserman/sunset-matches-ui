import React from "react";
import { Pressable, Text, View } from "react-native";

export default function EditProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#411400] items-center justify-between">
      <View className="bg-teal-200">
        <Text className="text-3xl text-white">EditProfileScreen</Text>
        <Pressable
          className="bg-red-400 p-1 rounded-lg px-2 mt-3"
          onPress={() => navigation.navigate("ViewProfileScreen")}
        >
          <Text className="text-white">View</Text>
        </Pressable>
      </View>
      <View className="bg-yellow-300 h-1 w-full"></View>
    </View>
  );
}
