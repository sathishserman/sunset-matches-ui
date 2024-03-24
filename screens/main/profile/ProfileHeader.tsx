import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileHeader({ navigation }: { navigation: any }) {
  const [selectedTab, setSelectedTab] = useState("view");

  useEffect(() => {
    navigation.navigate(
      selectedTab === "view" ? "ViewProfileScreen" : "EditProfileScreen"
    );
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

      <View className="flex-row w-full">
        <TouchableOpacity
          onPress={() => setSelectedTab("view")}
          className={`px-2 pt-4 pb-3 w-1/2 border-b border-white items-center justify-center ${
            selectedTab === "view" ? "border-b-2" : ""
          }`}
        >
          <Text
            className={`text-white font-robotoLight ${
              selectedTab === "view" ? "font-bold" : ""
            }`}
          >
            View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("edit")}
          className={`px-2 pt-4 pb-3 w-1/2 border-b border-white items-center justify-center ${
            selectedTab === "view" ? "" : "border-b-2"
          }`}
        >
          <Text
            className={`text-white font-robotoLight ${
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
