import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import BackHeader from "../../components/BackHeader";
import { Platform } from "react-native";
import { SafeAreaAndroidIOS } from "../../components/SafeAreaAndroidIOS";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";

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
    <SafeAreaAndroidIOS className="flex-1 bg-black">
      <BackHeader color="white" />
      <View className="flex-1 items-center justify-between w-full px-7">
        <Text
          className="text-6xl text-white w-5/6 text-center"
          style={{ fontFamily: "Italiana_400Regular" }}
        >
          Sunset Matches
        </Text>
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
    </SafeAreaAndroidIOS>
  );
}
