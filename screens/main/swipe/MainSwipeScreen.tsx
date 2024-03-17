import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import TinderCard from "@/components/TinderCard";
import { useSharedValue } from "react-native-reanimated";

const communitiesOptions = [
  "Asian",
  "Blk",
  "Christian",
  "Disabled",
  "Jewish",
  "Latino",
  "LGBTQ",
  "Muslim",
  "Veteran",
];
const datePreferencesOptions = [
  "Beer",
  "Chinese Food",
  "Coffee",
  "Dating with the View",
  "Drinks",
  "Indian Cuisine",
  "Italian Food",
  "Korean Food",
  "Local Food",
  "Mexican Food",
  "Pizza",
  "Rooftop Date",
  "Seafood",
  "Sushi",
  "Thai Food",
  "Wine",
];

interface User {
  id: number;
  image: any;
  name: string;
  age: number;
  bio: string;
  height: number;
  communities: string[];
  datePreferences: string[];
}

function generateRandomUser(id: number): User {
  const getRandomAge = (): number => Math.floor(Math.random() * 50) + 18; // Random age between 18 and 67
  const getRandomHeight = (): number => Math.floor(Math.random() * 50) + 150; // Random height between 150cm and 199cm
  const getRandomArrayItems = (items: any[], numItems: number): any[] => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  return {
    id,
    image: require("@/assets/onboarding/onboarding-match.png"), // Static image path
    name: `User${id}`, // Placeholder name
    age: getRandomAge(),
    bio: "This is a sample bio.", // Static bio
    height: getRandomHeight(),
    communities: getRandomArrayItems(communitiesOptions, 3), // Get 3 random communities
    datePreferences: getRandomArrayItems(datePreferencesOptions, 3), // Get 3 random date preferences
  };
}

export default function MainSwipeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);

  useEffect(() => {
    const generatedUsers = Array.from({ length: 16 }, (_, i) =>
      generateRandomUser(i + 1)
    );
    setUsers(generatedUsers);
  }, []);

  const activeIndex = useSharedValue(0);

  const onResponse = (res: boolean) => {
    // console.log("on Response: ", res);
    setActiveUserIndex((prevIndex) => prevIndex + 1);
    console.log("activeUserIndex: ", users[activeUserIndex + 1]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#411400]">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-between",
          flexGrow: 1,
        }}
        style={{
          marginBottom: tabBarHeight + 10,
        }}
      >
        <View className="py-6 flex justify-center items-center h-3/5">
          <View className="relative flex-1 items-center justify-center">
            {users.map((user, index) => (
              <TinderCard
                key={`${user.id}-${index}`}
                user={user}
                numOfCards={users.length}
                index={index}
                activeIndex={activeIndex}
                onResponse={onResponse}
              />
            ))}
          </View>
        </View>
        {users.length > 0 && (
          <View className="p-7 pt-0 flex-1">
            <Text className="text-white text-3xl">
              {users[activeUserIndex].name}, {users[activeUserIndex].age}
            </Text>
            <Text className="text-white">{users[activeUserIndex].bio}</Text>
            <View className="flex-row self-start my-4 py-1 px-2 border rounded-3xl border-white items-center">
              <FontAwesome name="arrows-v" size={16} color="#E25A28" />
              <Text className="text-white ml-1">
                {users[activeUserIndex].height} cm
              </Text>
            </View>
            <View>
              <Text className="text-[#E25A28] text-lg font-semibold">
                Communities
              </Text>
              <View className="flex-row my-2">
                {users[activeUserIndex].communities.map((community, index) => (
                  <View
                    key={index}
                    className="flex-row self-start mr-3 py-1 px-2 border rounded-3xl border-white items-center"
                  >
                    <Text className="text-white">{community}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="">
              <Text className="text-[#E25A28] text-lg font-semibold">
                Date Preferences
              </Text>
              <View className="flex-row my-2">
                {users[activeUserIndex].datePreferences.map(
                  (preference, index) => (
                    <View
                      key={index}
                      className="flex-row self-start mr-3 py-1 px-2 border rounded-3xl border-white items-center"
                    >
                      <Text className="text-white">{preference}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
