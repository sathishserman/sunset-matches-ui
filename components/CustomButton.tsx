import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

type ButtonProps = {
  onPress: () => void;
  gradient?: boolean;
  title: string;
  _className?: string;
  icon?: React.ReactNode; // Add this line
};

const CustomButton: React.FC<ButtonProps> = React.memo(
  ({ onPress, gradient, title, _className, icon }) => {
    // Add icon here
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`w-full border border-[#E25A28] rounded-full py-4 relative ${
          gradient ? "border-0" : ""
        } ${gradient ? "overflow-hidden" : ""} ${_className}`}
      >
        {gradient && (
          <LinearGradient
            colors={["#331003", "#E25A28"]}
            className="absolute left-0 right-0 top-0 bottom-0 rounded-full"
            start={{ x: 1, y: 0 }}
          />
        )}
        <View className="flex-row items-center justify-center">
          <Text className="text-white text-center text-base">{title}</Text>
          {icon && <View className="ml-2">{icon}</View>}
        </View>
      </TouchableOpacity>
    );
  }
);

export default CustomButton;
