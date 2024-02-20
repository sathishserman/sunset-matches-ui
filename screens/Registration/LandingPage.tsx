import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { LandingPageProps, RootState } from "../../redux/interfaces";
import { SafeAreaAndroidIOS } from "../../components/SafeAreaAndroidIOS";
import CustomButton from "../../components/CustomButton";

const LandingPage: React.FC<LandingPageProps> = ({ name, navigation }) => {
  return (
    <SafeAreaAndroidIOS className="flex-1 bg-[#270C00] items-center px-10">
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
        onPress={() => navigation.navigate("")}
        title="Create your profile"
        gradient
        _className="w-5/6 mt-32"
      ></CustomButton>
    </SafeAreaAndroidIOS>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.nameState.name,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DAA520",
    marginBottom: 20,
  },
  registrationComplete: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  createProfilePrompt: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  createProfileButton: {
    backgroundColor: "#DAA520",
    padding: 15,
    borderRadius: 25,
  },
  createProfileButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default connect(mapStateToProps)(LandingPage);
