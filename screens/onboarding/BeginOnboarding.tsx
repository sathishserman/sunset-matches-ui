import BackHeader from "../../components/BackHeader";
import React from "react";
import { View, Text } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { RootState } from "../../redux/interfaces";
import { connect } from "react-redux";
import CustomButton from "../../components/CustomButton";

const BeginOnboarding = ({ navigation }: { navigation: any }) => {
  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center justify-between my-10 relative">
        <View className="w-4/6">
          {/* <Text className="text-5xl text-center font-robotoMedium mb-2 text-[#E25A28]">
            SUNSET
          </Text> */}
          <Text
            className="text-6xl text-white text-center"
            style={{ fontFamily: "Italiana_400Regular" }}
          >
            Sunset Matches
          </Text>
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
          <View className="w-20 h-20 rounded-full bg-white"></View>
        </View>
        <View className="w-full items-center">
          <CustomButton
            onPress={() => {
              navigation.navigate("OnboardingSteps");
            }}
            title="Onboarding"
            _className="w-4/6 mb-5"
            gradient={true}
          />
          <CustomButton
            onPress={() => {
              console.log("Skip");
            }}
            title="Skip"
            _className="w-4/6"
          />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default BeginOnboarding;
