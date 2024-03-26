import React, { useEffect, useState } from "react";
import { TextInput, ScrollView, View, Button, Alert, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Image } from "expo-image";
import ProfileItem from "@/components/ProfileItem";
import GenderSelection from "@/components/GenderSelection";
import BioProfileItem from "@/components/BioProfileItem";

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
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const userRef = doc(db, "user", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(userSnap.data() as Profile);
      } else {
        Alert.alert("Profile not found");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async (attribute: keyof Profile, value: string) => {
    if (!userId || !profile) return;
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, { [attribute]: value });
    setProfile({ ...profile, [attribute]: value });
  };

  const handleSaveProfileItem = async (attribute: string, newValue: string) => {
    if (!userId || !profile) return;
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, { [attribute]: newValue });
    setProfile({ ...profile, [attribute]: newValue }); // Update local state
  };

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

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-[#411400]">
        <Text className="text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-[#411400] px-4 h-full">
      <ScrollView className="flex-grow">
        <View className="flex-row my-4">
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[0] }}
              placeholder={blurhash}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[1] }}
              placeholder={blurhash}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
          <View className="w-1/3 aspect-square items-center justify-center scale-90 border-[#E25A28] border rounded-full">
            <Image
              source={{ uri: profile.pics[2] }}
              placeholder={blurhash}
              className="w-[90%] aspect-square rounded-full"
            />
          </View>
        </View>

        <View className="mt-3">
          <Text className="text-[#E25A28] text-2xl font-semibold">
            Personal Information
          </Text>
          <View className="my-2">
            <ProfileItem
              label="Name"
              value={profile.name}
              rounded="top"
              onSave={(newValue) => handleSaveProfileItem("name", newValue)}
            />
            <ProfileItem
              label="Age"
              value={profile.age}
              // onPress={() => openModal("age", "Age", profile.age)}
              onSave={(newValue) => handleSaveProfileItem("age", newValue)}
            />
            <ProfileItem
              label="Height"
              value={profile.height}
              rounded="bottom"
              onSave={(newValue) => handleSaveProfileItem("height", newValue)}
            />
          </View>
        </View>
        <View className="mt-3">
          <Text className="text-[#E25A28] text-xl font-semibold">Bio</Text>
          <View className="my-2">
            <BioProfileItem
              label="Bio"
              value={profile.bio}
              onSave={(newValue) => handleSaveProfileItem("bio", newValue)}
              rounded="both"
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
              // onPress={() => openModal("email", "Email", profile.email)}
              onSave={(newValue) => handleSaveProfileItem("email", newValue)}
            />
            <ProfileItem
              label="Phone Number"
              value={profile.phone}
              rounded="bottom"
              // onPress={() => openModal("phone", "Phone Number", profile.phone)}
              onSave={(newValue) => handleSaveProfileItem("phone", newValue)}
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
              onSave={(newValue) =>
                handleSaveProfileItem("foodPreference", newValue)
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
