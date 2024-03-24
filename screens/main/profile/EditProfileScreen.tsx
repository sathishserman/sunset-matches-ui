import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import ProfileItem from "@/components/ProfileItem";
import ModalInput from "@/components/ModalInput";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/interfaces";

interface Profile {
  age: string;
  bio: string;
  communities: string[];
  dateThemes: string[];
  email: string;
  foodPreference: string;
  gender: string;
  height: string;
  name: string;
  phone: string;
  pics: string[];
  subscription: boolean;
}

export default function EditProfileScreen() {
  const userId = auth().currentUser?.uid;
  const [profile, setProfile] = useState<Profile | null>({
    age: "",
    bio: "",
    communities: [],
    dateThemes: [],
    email: "",
    foodPreference: "",
    gender: "",
    height: "",
    name: "",
    phone: "",
    pics: [],
    subscription: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const userRef = doc(db, "user", userId);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProfile(userSnap.data() as Profile);
          } else {
            Alert.alert("Profile not found");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          Alert.alert("Error fetching profile");
        }
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSaveProfile = async () => {
    if (typeof userId === "string" && profile !== null) {
      const userRef = doc(db, "user", userId);
      await updateDoc(userRef, profile as { [x: string]: any });
      console.log("Profile updated!");
      Alert.alert("Profile Updated");
    } else {
      console.error("User ID is undefined or profile is null");
      Alert.alert("User ID is undefined or profile is null");
    }
  };

  const openModal = (attribute: any) => {
    setEditingAttribute(attribute);
    setModalVisible(true);
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-[#411400]">
        <Text className="text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="bg-[#411400] p-4 h-full"
      contentInsetAdjustmentBehavior="automatic"
    >
      {profile.pics && profile.pics.length > 0 && (
        <View className="flex-row">
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[0] }}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[1] }}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[2] }}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
        </View>
      )}
      <View className="mt-3">
        <Text className="text-[#E25A28] text-2xl font-semibold">
          Personal Information
        </Text>
        <View className="my-2">
          <ProfileItem
            label="Name"
            value={profile.name}
            rounded="top"
            onPress={() => openModal("name")}
          />
          <ProfileItem
            label="Age"
            value={profile.age}
            onPress={() => openModal("age")}
          />
          <ProfileItem
            label="Height"
            value={profile.height}
            rounded="bottom"
            onPress={() => openModal("height")}
          />
        </View>
      </View>
      <View className="mt-3">
        <Text className="text-[#E25A28] text-2xl font-semibold">
          Contact Information
        </Text>
        <View className="my-2">
          <ProfileItem
            label="Email"
            value={profile.email}
            rounded="top"
            onPress={() => openModal("email")}
          />
          <ProfileItem
            label="Phone Number"
            value={profile.phone}
            rounded="bottom"
            onPress={() => openModal("phone")}
          />
        </View>
      </View>
      <View className="mt-3">
        <Text className="text-[#E25A28] text-2xl font-semibold">
          Preferences
        </Text>
        <View className="my-2">
          <ProfileItem
            label="Food Preference"
            value={profile.foodPreference}
            rounded="both"
            onPress={() => openModal("foodPreference")}
          />
        </View>
      </View>
      <ModalInput
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        attribute={editingAttribute}
        userId={userId} // pass userId here
      />
    </ScrollView>
  );
}
