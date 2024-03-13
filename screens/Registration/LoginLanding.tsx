import React from "react";
import { View, Text } from "react-native";
import BackHeader from "@/components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function LoginLanding({ navigation }: { navigation: any }) {
  const handleLogin = () => {
    navigation.navigate("Phone", {
      flow: "loginFlow",
    });
  };

  const handleSignUp = () => {
    navigation.navigate("Phone", {
      flow: "signupFlow",
    });
  };

  const handleHelpdesk = () => {};

  return (
    <SafeAreaView className="flex-1 bg-black">
      <BackHeader color="white" />
      <View className="flex-1 items-center justify-between w-full px-7">
        <Animated.Text
          entering={FadeInUp}
          className="text-6xl text-white w-5/6 text-center"
          style={{ fontFamily: "Italiana_400Regular" }}
        >
          Sunset Matches
        </Animated.Text>
        <View className="w-full">
          <CustomButton onPress={handleLogin} title="Log In" />
          <CustomButton
            onPress={handleSignUp}
            title="Sign Up"
            gradient
            _className="mt-5"
          />
          <Text
            onPress={handleHelpdesk}
            className="text-white text-center mt-5"
          >
            Helpdesk
          </Text>
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
}
