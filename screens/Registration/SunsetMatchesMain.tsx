import { View, Text } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SunsetMatchesMain({ navigation }: { navigation: any }) {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateX.value = Math.min(Math.max(0, event.translationX), 145);
    })
    .onEnd((event) => {
      if (event.translationX > 135) {
        translateX.value = withSpring(145, {}, () =>
          // runOnJS(navigation.navigate)("LoginLanding")
          runOnJS(navigation.navigate)("ProfilePic")
        );
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <>
      {/* <ImageBackground
        source={require('@/assets/bg.jpeg')} 
        style={styles.background}
      > */}
      <SafeAreaView className="flex-1 justify-between items-center px-7 bg-black pt-16 pb-5">
        <Text
          className="text-6xl text-white w-5/6 text-center"
          style={{ fontFamily: "Italiana_400Regular" }}
        >
          Sunset Matches
        </Text>

        <View>
          <GestureDetector gesture={gesture}>
            <View className="rounded-full mb-5 relative mx-8">
              <LinearGradient
                colors={["#331003", "#E25A28"]}
                className="absolute left-0 right-0 top-0 bottom-0 rounded-full"
                start={{ x: 1, y: 0 }}
              />
              <Animated.View
                className="px-5 py-4 rounded-full self-start relative"
                style={animatedStyles}
              >
                <LinearGradient
                  colors={["#331003", "#E25A28"]}
                  className="absolute left-0 right-0 top-0 bottom-0 rounded-full"
                  start={{ x: 1, y: 0 }}
                />
                <Text className="text-white text-2xl items-center justify-center">
                  start <AntDesign name="arrowright" size={24} color="white" />
                </Text>
              </Animated.View>
            </View>
          </GestureDetector>
          <Text className="text-[#898A8D]">
            By continuing you agree with our
            <Text className="underline">Terms&Conditions</Text> and the
            application of our
            <Text className="underline">Privacy Statement</Text>
          </Text>
        </View>
      </SafeAreaView>
      {/* </ImageBackground> */}
    </>
  );
}
