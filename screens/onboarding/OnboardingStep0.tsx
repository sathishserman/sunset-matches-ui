import { Image } from "expo-image";
import BackHeader from "../../components/BackHeader";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

export default function OnboardingStep0({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="flex-1 bg-[#411400] relative">
      <BackHeader color="white" />
      <View className="flex-1 my-32 justify-between">
        <Image
          source={require("../../assets/onboarding/onboarding-graph.png")}
          contentFit="cover"
          className="w-24 h-24 mx-auto"
        />
        <View className="items-center">
          <Text className="text-white text-xl font-robotoMedium">
            The app unlocks between
          </Text>
          <Text className="text-[#E25A28] text-2xl font-robotoLight">
            6:00 pm - 10:00 pm
          </Text>
        </View>
        <View>
          <Image
            source={require("../../assets/onboarding/onboarding-switch.png")}
            // contentFit="cover"
            className="w-24 mx-auto aspect-[2.12244898]"
          />
          <Text className="text-white font-robotoLight text-center mt-3">
            Toggle on
          </Text>
        </View>
      </View>
      <View className="items-center justify-center absolute bottom-0 left-0 right-0">
        <CustomButton
          onPress={() => {
            navigation.navigate("OnboardingStep1a");
          }}
          title="Continue"
          _className="w-4/6 mb-10"
          gradient={true}
        />
      </View>
    </SafeAreaView>
  );
}
