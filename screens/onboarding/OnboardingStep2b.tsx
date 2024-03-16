import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInRight, useSharedValue } from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import CustomButton from "../../components/CustomButton";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const TIME = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export default function OnboardingStep2b({ navigation }: { navigation: any }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [time, setTime] = useState("13:00");

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

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
                2
              </Text>
            </View>
          </Shadow>

          <View className="w-full items-center bg-transparent justify-between mt-10">
            <Animated.Text
              className="text-xl  text-white font-robotoMedium text-center"
              entering={FadeInRight.delay(200)}
            >
              Propose a time
              {"\n"}
              <Text className="text-sm text-[#E25A28] font-robotoMediumItalic">
                within 30 minutes
              </Text>
            </Animated.Text>
          </View>
        </View>

        <WheelPickerExpo
          height={300}
          width={150}
          initialSelectedIndex={3}
          backgroundColor="#411400"
          items={TIME.map((name) => ({ label: name, value: "" }))}
          onChange={({ item }) => setTime(item.label)}
        />

        <View className="items-center justify-center">
          <View>
            <CustomButton
              onPress={() => {
                navigation.navigate("OnboardingStep3");
              }}
              title="Propose"
              gradient
              _className="w-32 mt-5"
            />
          </View>
        </View>
      </View>

      <View className="bg-[#E25A28] py-2 relative items-center justify-center">
        <LinearGradient
          colors={["#331003", "#832300"]}
          className="absolute left-0 right-0 top-0 bottom-0"
          start={{ x: 1, y: 0 }}
        />
        <Text className="text-white font-robotoThin">
          Time left:{" "}
          <Text className="text-lg font-robotoRegular">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Text>
      </View>
    </CustomSafeAreaView>
  );
}
