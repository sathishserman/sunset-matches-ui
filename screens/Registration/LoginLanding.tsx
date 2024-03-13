import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import BackHeader from "../../components/BackHeader";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function LoginLanding({ navigation }: { navigation: any }) {

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  const onAuthStateChanged = (user:any) => {
    if (user) {
      // If user is logged in, navigate to the Home screen
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Location' }],
      // });
    }
    // If user is not logged in, stay on the current screen
  };

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
