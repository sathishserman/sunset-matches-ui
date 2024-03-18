import TinderCard from "@/components/TinderCard";
import { FontAwesome } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import generateRandomUser, { User } from "./generateRandomUser";

export default function MainSwipeScreen({ navigation }: { navigation: any }) {
  const tabBarHeight = useBottomTabBarHeight();
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);

  useEffect(() => {
    const generatedUsers = Array.from({ length: 16 }, (_, i) =>
      generateRandomUser(i + 1)
    );
    setUsers(generatedUsers);
  }, []);

  const activeIndex = useSharedValue(0);

  const onResponse = (res: boolean) => {
    if (res) {
      console.log("Liked", likedUsers.length);
      setLikedUsers((prevUsers: User[]) => [
        ...prevUsers,
        users[activeUserIndex],
      ]);
    } else {
      console.log("Disliked");
    }
    setActiveUserIndex((prevIndex: number) => prevIndex + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#411400]">
      <ScrollView
        style={{
          marginBottom: tabBarHeight + 10,
        }}
      >
        <View className="py-6 flex justify-center items-center flex-1">
          <View className="relative h-[45vh] items-center justify-center">
            {users.map((user: User, index: number) => (
              <TinderCard
                key={index}
                user={user}
                numOfCards={users.length}
                index={index}
                activeIndex={activeIndex}
                onResponse={onResponse}
              />
            ))}
          </View>
        </View>
        {users[activeUserIndex] && (
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
              <Text className="text-[#E25A28] text-lg font-semibold mb-1">
                Communities
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {users[activeUserIndex].communities.map((community, index) => (
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
                {users[activeUserIndex].datePreferences.map(
                  (preference, index) => (
                    <View
                      key={index}
                      className="flex-row self-start py-1 px-2 border rounded-3xl border-white items-center"
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
