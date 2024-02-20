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
    navigation.navigate("SignUp", {
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
            onPress={handleLogin}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 120,
  },
  loginButton: {
    borderColor: "#DAA520",
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#DAA520",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 120,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  helpdeskText: {
    color: "white",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
