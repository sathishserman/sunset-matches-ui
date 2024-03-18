import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

export default function MatchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#411400]">
      <LottieView
        source={require("@/assets/confetti.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }} // Set the size as you want
      />
    </SafeAreaView>
  );
}
