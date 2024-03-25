import ModalInput from "@/components/ModalInput";
import ProfileItem from "@/components/ProfileItem";
import { db } from "@/firebase/firebase";
import auth from "@react-native-firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import GenderSelection from "@/components/GenderSelection";
import { SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
// import { SafeAreaView } from "react-native-safe-area-context";

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
  const [editingAttribute, setEditingAttribute] = useState<string | null>(null);

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

  const handleSelectGender = (gender: string) => {
    setProfile((currentProfile) => {
      if (!currentProfile) return null;

      return {
        ...currentProfile,
        gender: gender,
      };
    });

    if (userId) {
      const userRef = doc(db, "user", userId);
      updateDoc(userRef, { gender: gender })
        .then(() => console.log("Gender updated"))
        .catch(console.error);
    }
  };

  const modalRef = useRef<BottomSheet>(null);

  const openModal = (attribute: string) => {
    setEditingAttribute(attribute);
    modalRef.current?.open();
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-[#411400]">
        <Text className="text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-[#411400] px-4 min-h-screen">
      <ScrollView className="flex-grow">
        {/* {profile.pics && profile.pics.length > 0 && (
          <View className="flex-row my-4">
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
        )} */}
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
        <GenderSelection
          selectedGender={profile.gender}
          onSelectGender={handleSelectGender}
        />
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
        {/* <View className="absolute bottom-0 left-0 right-0 h-screen"> */}
        <ModalInput
          attribute={editingAttribute}
          userId={userId}
          ref={modalRef}
        />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
