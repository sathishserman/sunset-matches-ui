import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { db } from "@/firebase/firebase";
import { uploadImage } from "@/service/storageService";
import * as ImagePicker from "expo-image-picker";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { Image } from "expo-image";

const AddImage = ({ navigation, route }: { navigation: any; route: any }) => {
  const { userId, imageIndex } = route.params;

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  const handleImage = async (source: string) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    try {
      if (!result.canceled) {
        const blob = await (await fetch(result.assets[0].uri)).blob();
        const file = new File([blob], `image_${Date.now()}`, {
          type: blob.type,
        });
        const downloadURL = await uploadImage(file, `images/${Date.now()}`);
        const userDocRef = doc(db, "user", userId);
        const docSnap = await getDoc(userDocRef);

        let userData = docSnap.exists() ? docSnap.data() : {};
        // Ensure pics is an array. Initialize if undefined.
        if (!userData.pics) {
          userData.pics = [];
        }

        // Safely assign downloadURL to the specified index.
        userData.pics[imageIndex] = downloadURL;

        // Update Firestore document.
        await setDoc(userDocRef, { pics: userData.pics }, { merge: true });
        navigation.navigate("ProfilePic");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 items-center justify-between px-5 pb-10"
      >
        <Text className="text-3xl text-[#E25A28]">Add your pictures</Text>
        <View>
          <Pressable
            className="w-4/5 aspect-video mb-10 border border-[#E25A28] items-center justify-center rounded-2xl"
            onPress={() => handleImage("gallery")}
          >
            <View className="w-1/6 aspect-[1.37507314] mb-1">
              {
                <Image
                  className="w-full h-full"
                  source={require("@/assets/imageUpIcons/gallery.png")}
                />
              }
            </View>
            <Text className="text-xl text-white">Your Gallery</Text>
          </Pressable>
          <Pressable
            className="w-4/5 aspect-video border border-[#E25A28] items-center justify-center rounded-2xl"
            onPress={() => handleImage("camera")}
          >
            <View className="w-1/6 aspect-[1.37507314] mb-1">
              {
                <Image
                  className="w-full h-full"
                  source={require("@/assets/imageUpIcons/selfie.png")}
                />
              }
            </View>
            <Text className="text-xl text-white">Take a selfie</Text>
          </Pressable>
        </View>
        <View></View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default AddImage;
