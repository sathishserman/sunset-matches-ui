import BackHeader from "../../components/BackHeader";
import React from "react";
import { Image } from "expo-image";

import { View, Text } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/CustomButton";

export default function OnboardingSteps({ navigation }: { navigation: any }) {
  return (
    <CustomSafeAreaView>
      <View className="flex-1 mb-14 items-center justify-center h-24">
        <Text className="text-2xl leading-[60px] text-white font-robotoLight">
          It takes only{" "}
          <Text className="text-[#E25A28]">
            <Text className="text-[55px] font-robotoBold">3</Text> steps...
          </Text>
        </Text>
        <View className="my-10 relative h-[340px] w-[245px]">
          <View className="top-0 bottom-0 left-0 right-0 rounded-full border scale-105 border-[#E25A28] absolute"></View>
          <View className="top-0 bottom-0 left-0 right-0 rounded-full scale-90 overflow-hidden">
            <Image
              source={require("../../assets/onboarding/onboarding-steps.png")}
              contentFit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
        <Text className="text-2xl text-white font-robotoLight">
          ...to go on <Text className="text-[#E25A28]">a date</Text>
        </Text>
      </View>
      <View className="items-center justify-center absolute bottom-0 left-0 right-0">
        <CustomButton
          onPress={() => {
            navigation.navigate("OnboardingStep0");
          }}
          title="Continue"
          _className="w-4/6 mb-10"
          gradient={true}
        />
      </View>
    </CustomSafeAreaView>
  );
}
