import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "@/firebase/firebase"; // Make sure to import your Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface Profile {
  name: string;
  age: number;
  bio: string;
  height: number;
  pics: string[];
  communities: string[];
  dateThemes: string[];
}

export default function ViewProfileScreen() {
  const userId = auth().currentUser?.uid;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.log("User ID is undefined");
        return;
      }

      try {
        const docRef = doc(db, "user", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <ScrollView
      className="flex-1 bg-[#411400]"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {profile && (
        <>
          <View className="h-[34vh] w-[53vw] rounded-full my-3 mb-5 overflow-hidden">
            <Image
              source={{ uri: profile.pics[0] }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <View className="flex-1 w-5/6">
            <Text className="text-white text-3xl">
              {profile.name}, <Text>{profile.age}</Text>
            </Text>
            <Text className="text-white my-2">{profile.bio}</Text>
            <View className="flex-row self-start my-4 py-1 px-2 border rounded-3xl border-white items-center">
              <FontAwesome name="arrows-v" size={16} color="#E25A28" />
              <Text className="text-white ml-1">{profile.height} cm</Text>
            </View>
            <View>
              <Text className="text-[#E25A28] text-lg font-semibold mb-1">
                Communities
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {profile.communities.map((community, index) => (
                  <View
                    key={index}
                    className="flex-row self-start py-1 px-2 border rounded-3xl border-white items-center"
                  >
                    <Text className="text-white">{community}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-[#E25A28] text-lg font-semibold mb-1">
                Date Preferences
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {profile.dateThemes.map((theme, index) => (
                  <View
                    key={index}
                    className="flex-row self-start py-1 px-2 border rounded-3xl border-white items-center"
                  >
                    <Text className="text-white">{theme}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
