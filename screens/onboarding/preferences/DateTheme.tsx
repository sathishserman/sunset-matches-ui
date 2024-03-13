import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { Image } from "expo-image";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { FlatGrid } from "react-native-super-grid";

type Theme = {
  image: any;
  theme: string;
};

export default function DateTheme() {
  const [selectedTheme, setSelectedTheme] = React.useState<Theme[]>([]);
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

  const handleThemePress = (theme: Theme, index: number) => {
    const isDuplicate = selectedTheme.some(
      (selected) => selected.theme === theme.theme
    );

    if (isDuplicate) {
      setSelectedTheme((prev) =>
        prev.filter((prevTheme) => prevTheme.theme !== theme.theme)
      );
    } else if (selectedTheme.length < 7) {
      setSelectedTheme((prev) => [...prev, theme]);
    }
  };

  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center justify-between pb-10">
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Your first date preferences
          </Text>
          <Text className="font-robotoLight text-white mt-3">Max. x7 </Text>
        </View>
      </View>
      <FlatGrid
        itemDimension={100}
        className="w-full max-h-[50vh]"
        maxItemsPerRow={3}
        adjustGridToStyles
        data={themes}
        renderItem={({ item: theme, index }) => (
          <View className="aspect-square items-center">
            <Pressable
              className={`border w-20 rounded-full overflow-hidden items-center aspect-square ${
                selectedTheme.some((selected) => selected.theme === theme.theme)
                  ? "border-[#E25A28]"
                  : "border-white"
              }`}
              onPress={() => handleThemePress(theme, index)}
              key={`theme-${index}`}
            >
              <Image source={theme.image} style={{ width: 40, height: 40 }} />
              <Text className="text-white font-robotoRegular text-xs">
                {theme.theme}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </CustomSafeAreaView>
  );
}
