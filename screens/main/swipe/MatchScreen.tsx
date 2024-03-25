import CustomButton from "@/components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchScreen({ navigation }: { navigation: any }) {
  const tabBarHeight = useBottomTabBarHeight() + (StatusBar.currentHeight ?? 0);

  return (
    <SafeAreaView className="flex-1 bg-[#411400] items-center justify-center">
      <View className="items-center justify-center w-5/6 mt-4">
        <Text className="text-4xl font-semibold text-white text-center">
          You and <Text className="text-[#E25A28]">Marta</Text> matched!
        </Text>
      </View>
      <View className="relative w-4/5 aspect-square mt-[7vh] ">
        <Image
          source={
            "https://firebasestorage.googleapis.com/v0/b/sunset-matches-a9651.appspot.com/o/images%2F1710954161055?alt=media&token=bfcc38d8-94a5-4f6e-bc55-15493f622f41"
          }
          className="w-3/5 h-5/6 rounded-full absolute top-0 left-0"
        />
        <Image
          source={
            "https://firebasestorage.googleapis.com/v0/b/sunset-matches-a9651.appspot.com/o/images%2F1710954161055?alt=media&token=bfcc38d8-94a5-4f6e-bc55-15493f622f41"
          }
          className="w-3/5 h-5/6 rounded-full absolute right-0 bottom-0"
        />
      </View>
      <View
        className="relative w-4/5 mt-[7vh] items-center justify-between"
        // style={{
        //   paddingBottom: tabBarHeight,
        // }}
      >
        <Text className="text-lg font-semibold text-white text-center">
          Confirm your date in <Text className="text-[#E25A28]">30min</Text> or
          the chance will quit
        </Text>
        <CustomButton
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Profile",
              params: {
                screen: "EditProfileScreen",
              },
            })
          }
          title="Continue"
          icon={<AntDesign name="arrowright" size={24} color={"white"} />}
          gradient
          _className="mt-[3vh]"
        />
      </View>
    </SafeAreaView>
  );
}
