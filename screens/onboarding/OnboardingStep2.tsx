import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInRight, useSharedValue } from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import CustomButton from "../../components/CustomButton";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
// import { ScrollView } from "react-native-gesture-handler";

export default function OnboardingStep2({ navigation }: { navigation: any }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(-1);

  const buttonVal = useSharedValue(0);
  const handlePress = () => {
    if (selectedRestaurant === -1) {
      return;
    }
    navigation.navigate("OnboardingStep2b");
  };
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-run the effect
    // when we update it
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  const data = [
    {
      title: "SOJA SUSHI",
      price: "50 - 200 $",
      distance: "2km",
      promo: "20% off",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
    {
      title: "RA'S SUSHI",
      price: "100 - 300 $",
      distance: "1km",
      promo: "10% off",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
    {
      title: "RA'S SUSHI",
      price: "100 - 300 $",
      distance: "1km",
      promo: "Free Drinks",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
    {
      title: "RA'S SUSHI",
      price: "100 - 300 $",
      distance: "1km",
      promo: "10% off",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
    {
      title: "RA'S SUSHI",
      price: "100 - 300 $",
      distance: "1km",
      promo: "10% off",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
    {
      title: "RA'S SUSHI",
      price: "100 - 300 $",
      distance: "1km",
      promo: "10% off",
      image: require("../../assets/onboarding/venues/ra-sushi.jpeg"),
    },
  ];

  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center pb-40 justify-between ">
        <View className="items-center justify-center">
          <Shadow
            distance={25}
            startColor={"#E68A3229"}
            endColor={"#E25A2809"}
            offset={[2, 2]}
            style={{
              borderRadius: 100,
              // marginBottom: 40,
            }}
          >
            <View className="w-16 h-16 items-center justify-center">
              <Text
                className="text-5xl font-bold text-[#E25A28] font-robotoMedium items-center  leading-[65px]"
                style={{
                  textAlignVertical: "center",
                }}
              >
                2
              </Text>
            </View>
          </Shadow>

          <View className="w-full items-center bg-transparent justify-between mt-10">
            <Animated.Text
              className="text-xl  text-white font-robotoMedium text-center"
              entering={FadeInRight.delay(200)}
            >
              Propose a venue
              {"\n"}
              <Text className="text-sm text-[#E25A28] font-robotoMediumItalic">
                within 30 minutes
              </Text>
            </Animated.Text>
          </View>
        </View>

        <View className="h-[55%] items-center justify-center">
          <ScrollView
            horizontal
            pagingEnabled
            className="pl-5"
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.map((item, index) => (
              <Pressable
                key={index}
                className={`items-center justify-center mr-[10vw] my-2 rounded-xl ${
                  selectedRestaurant === index
                    ? "border-2 border-[#E25A28]"
                    : ""
                }`}
                onPress={() => setSelectedRestaurant(index)}
              >
                <View className="items-center justify-center w-[90vw] h-full rounded-xl relative">
                  <Image
                    source={item.image}
                    className="absolute left-1 top-1 bottom-1 right-1 rounded-xl"
                    style={{}}
                  />
                  <LinearGradient
                    colors={["#33100380", "#E25A2850"]}
                    className="absolute left-1 top-1 bottom-1 right-1 rounded-xl"
                    start={{ x: -0.1, y: 1 }}
                  />
                  {item.promo && (
                    <View className="absolute top-4 left-4 bg-[#E25A28] p-1 rounded-md">
                      <Text className="text-white text-sm font-robotoBold">
                        {item.promo}
                      </Text>
                    </View>
                  )}
                  <View className="absolute bottom-4 right-4">
                    <Text className="text-white text-xl">{item.distance}</Text>
                  </View>
                  <View className="absolute bottom-4 left-4">
                    <Text className="text-[#E25A28] text-2xl font-robotoBold">
                      {item.title}
                    </Text>
                    <Text className="text-white text-xl font-robotoLight">
                      {item.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <CustomButton
            onPress={handlePress}
            title="Propose"
            gradient={selectedRestaurant !== -1}
            _className="w-32 mt-5"
          />
        </View>
      </View>

      <View className="bg-[#E25A28] py-2 relative items-center justify-center">
        <LinearGradient
          colors={["#331003", "#832300"]}
          className="absolute left-0 right-0 top-0 bottom-0"
          start={{ x: 1, y: 0 }}
        />
        <Text className="text-white font-robotoThin">
          Time left:{" "}
          <Text className="text-lg font-robotoRegular">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Text>
      </View>
    </CustomSafeAreaView>
  );
}
