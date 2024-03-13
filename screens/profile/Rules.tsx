import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { confirmRules } from "@/redux/actions";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Rules({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      dispatch(confirmRules());
      navigation.navigate("Gender");
    },
  });

  const Rule: React.FC<{ text: string }> = ({ text }) => (
    <View>
      <Text className="text-white text-center">{text}</Text>
      <View className="h-5 w-5 bg-[#E25A28] my-8 rounded-full self-center"></View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#411400] items-center justify-center px-10">
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
          <Rule text="Provide information truthfully about you" />
          <Rule text="Use the application with respect for others" />
          <Rule text="Report inappropriate behavior through the helpdesk" />
          <Text className="text-white text-center">XXX </Text>
        </View>
        <View className="items-center">
          <CustomButton
            title="I agree"
            gradient
            _className="w-5/6"
            onPress={formik.handleSubmit as any}
          ></CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
