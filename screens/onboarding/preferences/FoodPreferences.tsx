import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setFoodPreference } from "@/redux/actions";
import { doc, setDoc } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import { db } from "@/firebase/firebase";

export default function FoodPreference({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [selectedFoodPreference, setSelectedFoodPreference] =
    React.useState<string>();

  const foodPreference = [
    "All",
    "Pescatarian",
    "Vegetarian",
    "Vegan",
    "Kosher",
  ];

  const handleSubmit = async () => {
    if (selectedFoodPreference) {
      dispatch(setFoodPreference(selectedFoodPreference));

      const uid = auth().currentUser?.uid;
      if (!uid) {
        console.error("No user found");
        return;
      }
      const userRef = doc(db, "user", uid);

      try {
        await setDoc(
          userRef,
          { foodPreference: selectedFoodPreference },
          { merge: true }
        );
        console.log(
          "User's food preference updated successfully",
          selectedFoodPreference
        );
      } catch (error) {
        console.error("Error updating user's food preference:", error);
      }

      navigation.navigate("Bio");
    }
  };

  const handleLocationPress = (foodPreference: string) => {
    if (selectedFoodPreference === foodPreference) {
      setSelectedFoodPreference("");
    } else {
      setSelectedFoodPreference(foodPreference);
    }
  };

  return (
    <CustomSafeAreaView>
      <View className="flex-1 justify-between items-center pb-10">
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Select your food preferences
          </Text>
        </View>
        <View className="w-full items-center">
          {foodPreference.map((foodPreference, index) => {
            return (
              <Pressable
                className={`w-2/3 border rounded-full p-5 py-3 mt-7 items-center ${
                  selectedFoodPreference === foodPreference
                    ? "border-[#E25A28]"
                    : "border-white"
                }`}
                onPress={() => handleLocationPress(foodPreference)}
                key={`foodPreference-${index}`}
              >
                <Text className="text-white font-robotoRegular text-lg">
                  {foodPreference}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <CustomButton
          onPress={handleSubmit}
          gradient={!!selectedFoodPreference}
          title="Continue"
          _className="w-2/3"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
