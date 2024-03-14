import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { Image } from "expo-image";
import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { FlatGrid, SimpleGrid } from "react-native-super-grid";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from "react-redux";
import { setDateTheme } from "@/redux/actions";

type Theme = {
  image: any;
  theme: string;
};

export default function DateTheme({ navigation }: { navigation: any }) {
  const [selectedTheme, setSelectedTheme] = React.useState<string[]>([]);
  const themes = [
    { image: require("@/assets/foodIcons/beer.png"), theme: "Beer" },
    {
      image: require("@/assets/foodIcons/chinese-food.png"),
      theme: "Chinese Food",
    },
    { image: require("@/assets/foodIcons/coffee.png"), theme: "Coffee" },
    {
      image: require("@/assets/foodIcons/dating-with-the-view.png"),
      theme: "Dating with the View",
    },
    { image: require("@/assets/foodIcons/drinks.png"), theme: "Drinks" },
    {
      image: require("@/assets/foodIcons/indian-cuisine.png"),
      theme: "Indian Cuisine",
    },
    {
      image: require("@/assets/foodIcons/italian-food.png"),
      theme: "Italian Food",
    },
    {
      image: require("@/assets/foodIcons/korean-food.png"),
      theme: "Korean Food",
    },
    {
      image: require("@/assets/foodIcons/local-food.png"),
      theme: "Local Food",
    },
    {
      image: require("@/assets/foodIcons/mexican-food.png"),
      theme: "Mexican Food",
    },
    { image: require("@/assets/foodIcons/pizza.png"), theme: "Pizza" },
    {
      image: require("@/assets/foodIcons/rooftop-date.png"),
      theme: "Rooftop Date",
    },
    { image: require("@/assets/foodIcons/seafood.png"), theme: "Seafood" },
    { image: require("@/assets/foodIcons/sushi.png"), theme: "Sushi" },
    { image: require("@/assets/foodIcons/thai-food.png"), theme: "Thai Food" },
    { image: require("@/assets/foodIcons/wine.png"), theme: "Wine" },
  ];

  const dispatch = useDispatch();
  const handleThemePress = (theme: Theme, index: number) => {
    const isDuplicate = selectedTheme.some(
      (selected) => selected === theme.theme
    );

    if (isDuplicate) {
      setSelectedTheme((prev) =>
        prev.filter((prevTheme) => prevTheme !== theme.theme)
      );
    } else if (selectedTheme.length < 7) {
      setSelectedTheme((prev) => [...prev, theme.theme]);
    }
  };

  const handleSubmit = () => {
    if (selectedTheme.length) {
      dispatch(setDateTheme(selectedTheme));
      navigation.navigate("FoodPreference");
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Your first date preferences
          </Text>
          <Text className="font-robotoLight text-white mt-3">Max. x7 </Text>
        </View>

        <SimpleGrid
          itemDimension={100}
          className="w-full pt-10"
          maxItemsPerRow={3}
          adjustGridToStyles
          data={themes}
          listKey={"date-theme"}
          renderItem={({ item: theme, index }) => (
            <Pressable
              onPress={() => handleThemePress(theme, index)}
              className="aspect-square items-center"
            >
              <Shadow
                distance={
                  selectedTheme.some((selected) => selected === theme.theme)
                    ? 12
                    : 0
                }
                startColor={"#E68A3229"}
                endColor={"#E25A2809"}
                paintInside={selectedTheme.some(
                  (selected) => selected === theme.theme
                )}
                style={{
                  borderRadius: 100,
                }}
              >
                <View
                  className={`border w-24 rounded-full overflow-hidden items-center aspect-square border-[#E25A28]`}
                  key={`theme-${index}`}
                >
                  <View className="w-14 h-10 mt-4">
                    <Image
                      source={theme.image}
                      style={{ width: "auto", height: "100%" }}
                      contentFit="contain"
                    />
                  </View>
                  <Text className="text-white font-robotoRegular text-xs text-center w-4/5 mt-1">
                    {theme.theme}
                  </Text>
                </View>
              </Shadow>
            </Pressable>
          )}
        />
        <CustomButton
          onPress={handleSubmit}
          gradient={!!selectedTheme.length}
          title="Continue"
          _className="w-2/3 mb-10"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
}
