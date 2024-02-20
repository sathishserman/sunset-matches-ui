import React from "react";
import { View, Platform, StatusBar, SafeAreaView } from "react-native";

export const SafeAreaAndroidIOS = (props) => {
  const SafeAreaAndroidIOSStyle = {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  };

  return (
    <SafeAreaView style={[SafeAreaAndroidIOSStyle, props.style]}>
      {props.children}
    </SafeAreaView>
  );
};
