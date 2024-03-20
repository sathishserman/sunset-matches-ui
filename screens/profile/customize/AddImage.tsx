import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImage, storeImageUrl } from "@/service/storageService"; // Adjust the import path as necessary
import auth from "@react-native-firebase/auth";

const userId = auth().currentUser?.uid;
const route = { params: { userId } };

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    // Use the file URI to create a Blob for uploading
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();

    // Define the path where the image will be stored in Firebase Storage
    const path = `images/${Date.now()}`; // Customize your path as needed

    // Use the uploadImage function from storageService
    const file = new File([blob], "filename", {
      type: blob.type,
      lastModified: Date.now(),
    });
    const downloadURL = await uploadImage(file, path);

    // Assuming you have a user ID to associate with the image

    if (!userId) {
      console.error("No user found");
      return;
    }
    // Use the storeImageUrl function to store the image URL in Firestore
    await storeImageUrl("user", userId, [downloadURL]);

    // Here you can set the state with the new image URL or navigate the user away
    console.log(downloadURL); // URL of theuploaded image
  }
};

const handlePress = async () => {
  const localUri = await pickImage();
  if (localUri !== undefined) {
    const imageUrl = await pickImage();
    console.log(imageUrl); // You can now set this in the state and pass to other components or save in redux
  }
};

export default function AddImage({ navigation }: { navigation: any }) {
  const userId = route.params.userId;
  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="items-center justify-between px-5 pb-10 flex-1"
      >
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Add your pictures
          </Text>
        </View>
        <View>
          <Pressable
            className="w-4/5 aspect-video border border-[#E25A28] rounded-2xl mb-10 items-center justify-center"
            onPress={handlePress}
          >
            <View className="w-1/6 aspect-[1.37507314] mb-1">
              {
                <Image
                  className="w-full h-full"
                  source={require("@/assets/imageUpIcons/gallery.png")}
                />
              }
            </View>

            <Text className="text-xl text-white">Take a selfie</Text>
          </Pressable>
          <View className="w-4/5 aspect-video border border-[#E25A28] rounded-2xl items-center justify-center">
            <View className="w-1/6 aspect-[1.37507314] mb-1">
              <Image
                className="w-full h-full"
                source={require("@/assets/imageUpIcons/selfie.png")}
              />
            </View>

            <Text className="text-xl text-white">Your Gallery</Text>
          </View>
        </View>
        <View />
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
