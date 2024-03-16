import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from "react-native";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import Animated, {
  BounceIn,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  handlePress: () => void;
  buttonVal: SharedValue<number>;
  icon?: boolean;
};

export default function CustomOnboardButton({
  handlePress,
  buttonVal,
  icon = true,
}: Props) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        buttonVal.value === SCREEN_HEIGHT ? withSpring(160) : withSpring(60),
      height:
        buttonVal.value === SCREEN_HEIGHT ? withSpring(60) : withSpring(60),
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        buttonVal.value === SCREEN_HEIGHT ? withSpring(1) : withSpring(0),
    };
  });

  const iconAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        buttonVal.value === SCREEN_HEIGHT ? withSpring(0) : withSpring(1),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        className="z-10 w-16 h-16 bg-[#E25A28] rounded-full items-center justify-center relative"
        style={buttonAnimationStyle}
      >
        {/* {icon ? (
          <AntDesign name="arrowright" size={28} color={"#fff"} />
        ) : (
          <Animated.Text entering={BounceIn} className="text-xl">
            Continue
          </Animated.Text>
        )} */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Text
            entering={BounceIn}
            className="text-xl text-white font-robotoMedium"
            style={textAnimationStyle}
          >
            Continue
          </Animated.Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View style={iconAnimationStyle} className="absolute ">
            <AntDesign name="arrowright" size={28} color={"#fff"} />
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
