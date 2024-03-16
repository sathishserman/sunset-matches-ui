import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import themes from "@/data/dateThemesData";
import { db } from "@/firebase/firebase";
import { setDateTheme } from "@/redux/actions";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { SimpleGrid } from "react-native-super-grid";
import { useDispatch } from "react-redux";

type Theme = {
  image: any;
  theme: string;
};

export default function DateTheme({ navigation }: { navigation: any }) {
  const [selectedTheme, setSelectedTheme] = React.useState<string[]>([]);
  // const themes = themesData.themes;

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

  const handleSubmit = async () => {
    if (selectedTheme.length) {
      dispatch(setDateTheme(selectedTheme));

      const uid = auth().currentUser?.uid;
      if (!uid) {
        console.error("No user found");
        return;
      }
      const userRef = doc(db, "users", uid);

      try {
        await setDoc(userRef, { dateThemes: selectedTheme }, { merge: true });
        console.log(
          "User's date theme preferences updated successfully",
          selectedTheme
        );
      } catch (error) {
        console.error("Error updating user's date theme preferences:", error);
      }

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
