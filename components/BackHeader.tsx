import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "react-native-vector-icons/AntDesign";
interface BackHeaderProps {
  color: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ color = "white" }) => {
  const navigation = useNavigation();

  return (
    <View className=" h-12 flex-row items-center justify-start m-3 mt-0">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft name="arrowleft" size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
