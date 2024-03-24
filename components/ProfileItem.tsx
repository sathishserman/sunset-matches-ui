import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ProfileItemProps = {
  label: string;
  value: string | number;
  onPress: () => void;
  rounded?: "top" | "bottom" | "both" | "none";
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  label,
  value,
  onPress,
  rounded = "none",
}) => {
  let borderRadiusClasses = "";
  if (rounded === "top") {
    borderRadiusClasses = "rounded-t-xl";
  } else if (rounded === "bottom") {
    borderRadiusClasses = "rounded-b-xl";
  } else if (rounded === "both") {
    borderRadiusClasses = "rounded-xl";
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-[#712C0D] p-4 my-[1px] flex-row justify-between items-center ${borderRadiusClasses}`}
    >
      <Text className="text-white text-[16px] font-robotoMedium">{label}</Text>
      <Text className="text-[#E25A28] text-[16px] font-robotoMedium">
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileItem;
