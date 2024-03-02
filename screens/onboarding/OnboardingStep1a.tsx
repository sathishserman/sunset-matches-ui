import { Image } from "expo-image";
import BackHeader from "../../components/BackHeader";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import ArrowRight from "react-native-vector-icons/AntDesign";
import CustomButton from "../../components/CustomButton";

export default function OnboardingStep1a({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="flex-1 bg-[#411400] relative">
      <BackHeader color="white" />
      <View className="flex-1 items-center py-5">
        <Shadow
          distance={25}
          startColor={"#E68A3229"}
          endColor={"#E25A2809"}
          offset={[2, 2]}
          style={{
            //   width: "10%",
            //   height: "10%",
            borderRadius: 100,
            marginBottom: 40,
            //   margin: 20,
            // backgroundColor: "#411400",
          }}
        >
          <View className="w-16 h-16 items-center justify-center">
            <Text
              className="text-5xl font-bold text-[#F54D00] font-robotoMedium items-center  leading-[65px]"
              style={{
                textAlignVertical: "center",
              }}
            >
              1
            </Text>
          </View>
        </Shadow>
        <View>
          <Text className="text-xl text-white font-robotoMedium text-center">
            Start swiping
          </Text>
          <View className="flex-row items-center">
            <ArrowLeft name="arrowleft" size={24} color={"white"} />
            <View className="my-5 relative h-[340px] w-[245px]">
              <View className="top-0 bottom-0 left-0 right-0 rounded-full scale-90 overflow-hidden border border-[#E25A28]">
                <Image
                  source={require("../../assets/onboarding/onboarding-match.png")}
                  contentFit="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            <ArrowRight name="arrowright" size={24} color={"white"} />
          </View>
          <Text className="text-xl text-white font-robotoMedium text-center">
            Max. 10 right swipes / <Text className="text-[#F54D00]">day</Text>
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
