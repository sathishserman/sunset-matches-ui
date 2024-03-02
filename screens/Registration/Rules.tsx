import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, Text } from "react-native";

export default function Rules({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="flex-1 bg-[#270C00] items-center justify-center px-10">
      <View className="h-[80vh] justify-between">
        <View>
          <Text
            className="text-4xl text-white text-center"
            style={{ fontFamily: "Italiana_400Regular" }}
          >
            Sunset Matches
          </Text>
          <Text
            className="text-[#E25A28] text-center text-2xl font-robotoRegular"
            style={{ letterSpacing: 4 }}
          >
            RULES
          </Text>
        </View>
        <View>
          <Text className="text-white text-center">
            Provide information truthfully about you
          </Text>
          <View className="h-5 w-5 bg-[#E25A28] my-8 rounded-full self-center"></View>
          <Text className="text-white text-center">
            Use the application with respect for others
          </Text>
          <View className="h-5 w-5 bg-[#E25A28] my-8 rounded-full self-center"></View>
          <Text className="text-white text-center">
            Report inappropriate behavior through the helpdesk
          </Text>
          <View className="h-5 w-5 bg-[#E25A28] my-8 rounded-full self-center"></View>
          <Text className="text-white text-center">XXX </Text>
        </View>
        <View className="items-center">
          <CustomButton
            title="I agree"
            gradient
            _className="w-5/6"
            onPress={() => {
              navigation.navigate("Gender");
            }}
          ></CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
