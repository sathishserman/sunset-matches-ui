import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInRight, useSharedValue } from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { Image } from "expo-image";

export default function OnboardingStep3({ navigation }: { navigation: any }) {
  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center justify-between pb-32">
        <View className="items-center justify-center">
          <Shadow
            distance={25}
            startColor={"#E68A3229"}
            endColor={"#E25A2809"}
            offset={[2, 2]}
            style={{
              borderRadius: 100,
            }}
          >
            <View className="w-16 h-16 items-center justify-center">
              <Text
                className="text-5xl font-bold text-[#E25A28] font-robotoMedium items-center  leading-[65px]"
                style={{
                  textAlignVertical: "center",
                }}
              >
                3
              </Text>
            </View>
          </Shadow>

          <View className="w-3/5 items-center bg-transparent justify-between mt-10">
            <Animated.Text
              className="text-xl  text-white font-robotoMedium text-center"
              entering={FadeInRight.delay(200)}
            >
              Your date with <Text className="text-[#E25A28]">Martha</Text> was
              accepted!
            </Animated.Text>
          </View>
        </View>

        <View className="relative items-center justify-center h-96">
          <View className="absolute z-10 transform rounded-2xl -rotate-3">
            <Image
              source={require("@/assets/onboarding/onboarding-match.png")}
              style={{ width: 250, height: 300, borderRadius: 16 }}
            />
          </View>
          <View
            className="absolute z-20 transform rounded-2xl rotate-3 border-2 border-[#E25A28]"
            style={{ width: 250, height: 300 }}
          />
        </View>

        <Text className="text-center text-xl font-robotoLight text-white w-5/6">
          Your date with{" "}
          <Text className="no-underline text-[#E25A28]">Martha</Text> at{" "}
          <Text className="underline text-[#E25A28]">Soja SUSHI</Text> by{" "}
          <Text className="underline text-[#E25A28]">8pm</Text> was accepted.
        </Text>

        <View className="items-center justify-center">
          <View>
            <CustomButton
              onPress={() => {
                navigation.navigate("OnboardingStep3");
              }}
              title="Finish"
              gradient
              _className="w-32 mt-5"
            />
          </View>
        </View>
      </View>
    </CustomSafeAreaView>
  );
}
