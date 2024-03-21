import TinderCard from "@/components/TinderCard";
import { FontAwesome } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadPotentialMatches, recordSwipe } from "@/service/matchingAlgorithm";
import auth from "@react-native-firebase/auth";

export interface User {
  id: number;
  image: any;
  name: string;
  age: number;
  bio: string;
  height: number;
  communities: string[];
  dateThemes: string[];
  pics: string[];
}

export default function MainSwipeScreen({ navigation }: { navigation: any }) {
  const tabBarHeight = useBottomTabBarHeight();
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const activeIndex = useSharedValue(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [match, setMatch] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      const userId = auth().currentUser?.uid;
      if (userId) {
        const matches = await loadPotentialMatches(userId);
        console.log("Potential Matches", matches.length);
        setUsers(matches);
      }
    };
    fetchMatches();
  }, []);

  const onResponse = async (liked: any) => {
    const userId = auth().currentUser?.uid;
    const targetUserId = users[activeUserIndex]?.id;
    const name = users[activeUserIndex]?.name;
    if (userId && targetUserId) {
      setActiveUserIndex((prevIndex) => prevIndex + 1);
      const { success, matchFound } = await recordSwipe(
        userId,
        targetUserId,
        liked ? "right" : "left"
      );
      if (matchFound) {
        setShowMatchModal(true);
        setMatch(name);
      }
      if (success) {
        console.log(liked ? "Liked" : "Disliked", targetUserId);
      }
    }
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
                {users[activeUserIndex].dateThemes.map((preference, index) => (
                  <View
                    key={index}
                    className="flex-row self-start py-1 px-2 border rounded-3xl border-white items-center"
                  >
                    <Text className="text-white">{preference}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMatchModal}
          onRequestClose={() => {
            setShowMatchModal(!showMatchModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You matched with {match}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowMatchModal(!showMatchModal)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#E25A28",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
