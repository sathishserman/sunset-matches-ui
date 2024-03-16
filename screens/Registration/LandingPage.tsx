import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { LandingPageProps, RootState } from "@/redux/interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const LandingPage: React.FC<LandingPageProps> = ({ name, navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#411400] items-center px-10">
      <Text className="text-5xl font-robotoMedium mb-2 text-[#E25A28] mt-24">
        Hi, {name.split(" ")[0]}!
      </Text>
      <Text className="mt-12 font-robotoBlack text-xl text-white mb-2">
        Your registration is complete!
      </Text>
      <Text
        // style={styles.createProfilePrompt}
        className="font-robotoRegular text-sm text-white text-center mt-2"
      >
        Now you can create your profile, after which you can immediately start
        matching
      </Text>

      <CustomButton
        onPress={() => navigation.navigate("Rules")}
        title="Create your profile"
        gradient
        _className="w-5/6 mt-32"
      ></CustomButton>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.nameState.name,
});

export default connect(mapStateToProps)(LandingPage);
