import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  onPress: () => void;
  gradient?: boolean;
  title: string;
  _className?: string;
};

const CustomButton: React.FC<ButtonProps> = React.memo(
  ({ onPress, gradient, title, _className }) => {
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
        <Text className="text-white text-center text-base">{title}</Text>
      </TouchableOpacity>
    );
  }
);

export default CustomButton;
