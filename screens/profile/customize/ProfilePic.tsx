import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { db } from "@/firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "@/components/CustomButton";

export default function ProfilePic({ navigation }: { navigation: any }) {
  const pictureRequirements = [
    "Clear Environment",
    "No sunglasses",
    "Lightened up room",
  ];

  const [picUrls, setPicUrls] = useState<string[]>([]);
  const userId = auth().currentUser?.uid;

  const fetch = async () => {
    const fetchImageUrls = async () => {
      if (userId) {
        const docRef = doc(db, "user", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.pics) {
            setPicUrls(data.pics);
          }
        }
      } else {
        return;
      }
    };

    await fetchImageUrls();
    console.log("Pic Urls", picUrls);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetch();
    }, [])
  );

  const goToNextScreen = (imageIndex: number) => {
    navigation.navigate("AddImage", { userId, imageIndex });
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="items-center justify-between px-5 pb-5 flex-1"
      >
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Add your pictures
          </Text>
        </View>

        <View className="w-4/5 aspect-square items-center justify-center flex-row">
          <Pressable
            className="w-[22vw] h-[22vw] rounded-full border border-[#E25A28] items-center justify-center"
            onPress={() => {
              goToNextScreen(0);
            }}
          >
            {picUrls[0] ? (
              <Image
                source={picUrls[0]}
                className="w-full h-full rounded-full scale-90"
              />
            ) : (
              <Entypo name="plus" size={24} color="#E25A28" />
            )}
          </Pressable>
          <Pressable
            className="w-[22vw] h-[22vw] rounded-full border border-[#E25A28] items-center justify-center ml-5"
            onPress={() => {
              goToNextScreen(1);
            }}
          >
            {picUrls[1] ? (
              <Image
                source={picUrls[1]}
                className="w-full h-full rounded-full scale-90"
              />
            ) : (
              <Entypo name="plus" size={24} color="#E25A28" />
            )}
          </Pressable>
          <Pressable
            className="w-[22vw] h-[22vw] rounded-full border border-[#E25A28] items-center justify-center ml-5"
            onPress={() => {
              goToNextScreen(2);
            }}
          >
            {picUrls[2] ? (
              <Image
                source={picUrls[2]}
                className="w-full h-full rounded-full scale-90"
              />
            ) : (
              <Entypo name="plus" size={24} color="#E25A28" />
            )}
          </Pressable>
        </View>

        <View className="w-5/6">
          <Text className="text-[#E25A28] text-lg text-left font-bold mb-5">
            The pictures should be:
          </Text>
          {pictureRequirements.map((requirement, index) => (
            <View className="flex-row items-center mb-2" key={index}>
              <View className="w-8 h-8">
                <Image
                  source={require("@/assets/star.png")}
                  className="w-full h-full"
                />
              </View>
              <Text className="text-white ml-2">{requirement}</Text>
            </View>
          ))}
        </View>

        <CustomButton
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Discover",
              params: {
                screen: "MainSwipe",
              },
            })
          }
          title="Next"
          gradient
          _className="w-5/6 mt-5"
        />
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
