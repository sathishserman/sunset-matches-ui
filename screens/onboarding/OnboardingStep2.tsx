import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Animated, {
  BounceIn,
  FadeInRight,
  FadeInUp,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import CustomOnboardButton from "./CustomOnboardButton";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingStep2({ navigation }: { navigation: any }) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [currentStep, setCurrentStep] = React.useState(0);
  const buttonVal = useSharedValue(0);
  const handlePress = () => {
    buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT);
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }
    navigation.navigate("OnboardingStep2b");
  };
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-run the effect
    // when we update it
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  const data = [
    {
      title: "Start swiping",
      titleColored: "",
      description: "Max. 10 right swipes /",
      descriptionColored: "day",
      image: require("../../assets/onboarding/onboarding-match.png"),
    },
    {
      title: "You’ll match with",
      titleColored: "one person a day",
      description: "There is no chat. No ghosting",
      extra: "Go on a date",
      extraColored: "right now",
      image: require("../../assets/onboarding/onboarding-match.png"),
    },
  ];

  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center pb-10 justify-between">
        <Shadow
          distance={25}
          startColor={"#E68A3229"}
          endColor={"#E25A2809"}
          offset={[2, 2]}
          style={{
            borderRadius: 100,
            // marginBottom: 40,
          }}
        >
          <View className="w-16 h-16 items-center justify-center">
            <Text
              className="text-5xl font-bold text-[#E25A28] font-robotoMedium items-center  leading-[65px]"
              style={{
                textAlignVertical: "center",
              }}
            >
              1
            </Text>
          </View>
        </Shadow>

        <View className="w-full items-center bg-transparent justify-between">
          <Animated.Text
            className="text-xl  text-white font-robotoMedium text-center"
            entering={FadeInRight.delay(200)}
            key={`text2-${currentStep}`}
          >
            Propose a venue
            {"\n"}
            <Text className="text-sm text-[#E25A28] font-robotoMediumItalic">
              within 30 minutes
            </Text>
          </Animated.Text>

          <View className="flex-row items-center">
            <AntDesign name="arrowleft" size={24} color={"white"} />
            <Animated.View
              entering={FadeInUp.delay(300)}
              className="my-5 relative h-[340px] w-[245px]"
            >
              <View className="top-0 bottom-0 left-0 right-0 rounded-full scale-90 overflow-hidden border border-[#E25A28]">
                <Image
                  source={require("../../assets/onboarding/onboarding-match.png")}
                  contentFit="cover"
                  style={{ width: "100%", height: "100%" }}
                />
                <Animated.View
                  className={`bg-[#E25A2820] top-0 bottom-0 left-0 right-0 absolute items-center justify-center ${
                    currentStep === 0 ? "hidden" : "flex"
                  }`}
                  entering={BounceIn.delay(300)}
                >
                  <Text className="text-[#E25A28] text-3xl font-robotoBold">
                    It's a MATCH
                  </Text>
                </Animated.View>
              </View>
            </Animated.View>
            <AntDesign name="arrowright" size={24} color={"white"} />
          </View>

          <Animated.Text
            className="text-xl text-white font-robotoMedium text-center"
            entering={FadeInRight.delay(200)}
            key={`text-${currentStep}`}
          >
            {data[currentStep].description}{" "}
            {data[currentStep].descriptionColored && (
              <Text className="text-[#E25A28]">
                {data[currentStep].descriptionColored}
              </Text>
            )}
            {"\n"}
            {data[currentStep].extra && (
              <Text className="text-white">
                {data[currentStep].extra}{" "}
                <Text className="text-[#E25A28]">
                  {data[currentStep].extraColored}
                </Text>
              </Text>
            )}
          </Animated.Text>
        </View>

        <CustomOnboardButton
          handlePress={handlePress}
          buttonVal={buttonVal}
          icon={currentStep === 1 ? false : true}
        />
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
