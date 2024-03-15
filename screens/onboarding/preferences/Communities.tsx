import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCommunities as setCommunitiesAction } from "@/redux/actions";
import { db } from "@/firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { AntDesign } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";

type CommunityData = {
  community: string;
  image: ImageSourcePropType;
};

const communityImages: Record<string, ImageSourcePropType> = {
  Black: require("@/assets/communities/black.png"),
  Latino: require("@/assets/communities/latino.png"),
  Asian: require("@/assets/communities/asian.png"),
  Jewish: require("@/assets/communities/jewish.png"),
  Muslim: require("@/assets/communities/muslim.png"),
  Veteran: require("@/assets/communities/veteran.png"),
  LGBTQ: require("@/assets/communities/lgbtq.png"),
  Disabled: require("@/assets/communities/disabled.png"),
  Christian: require("@/assets/communities/christian.png"),
};

const updateUserRecord = async (selectedCommunity: any) => {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    console.error("No user found");
    return;
  }
  const userRef = doc(db, "users", uid); // Ensure the collection name matches your Firestore setup
  try {
    await setDoc(userRef, { communities: selectedCommunity }, { merge: true });
    console.log("User record created or updated successfully");
  } catch (error) {
    console.error("Error creating or updating user record:", error);
  }
};

export default function Communities({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [selectedCommunity, setSelectedCommunity] = useState<string[]>([]);
  const [communities, setCommunities] = useState<CommunityData[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const querySnapshot = await getDocs(collection(db, "communities"));
      const communitiesData: CommunityData[] = [];
      querySnapshot.forEach((doc) => {
        const communityName = doc.data().name; // Assuming 'name' field holds the community name
        if (communityImages[communityName]) {
          communitiesData.push({
            community: communityName,
            image: communityImages[communityName],
          });
        }
      });
      setCommunities(communitiesData);
    };

    fetchCommunities();
  }, []);

  const handleSubmit = async () => {
    if (selectedCommunity.length) {
      dispatch(setCommunitiesAction(selectedCommunity));
      navigation.navigate("DateTheme");
    }
  };

  const handleCommunityPress = (communityName: string) => {
    const isDuplicate = selectedCommunity.includes(communityName);
    if (isDuplicate) {
      setSelectedCommunity((prev) => prev.filter((c) => c !== communityName));
    } else if (selectedCommunity.length < 7) {
      setSelectedCommunity((prev) => [...prev, communityName]);
    }
  };

  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center justify-between pb-10">
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            Choose your communities
          </Text>
          <Text className="font-robotoLight text-white mt-3">Max. x7 </Text>
        </View>
        <FlatGrid
          itemDimension={100}
          className="w-full max-h-[50vh]"
          maxItemsPerRow={3}
          adjustGridToStyles
          data={communities}
          renderItem={({ item, index }) => (
            <View className="aspect-square items-center">
              <Pressable
                className={`border w-20 rounded-full overflow-hidden items-center aspect-square ${
                  selectedCommunity.includes(item.community)
                    ? "border-[#E25A28]"
                    : "border-white"
                }`}
                onPress={() => handleCommunityPress(item.community)}
                key={`community-${index}`}
              >
                <Image
                  source={item.image}
                  className="w-full h-full p-0 scale-[.85] rounded-full"
                />
              </Pressable>
              <Text className="text-white font-robotoRegular text-xs mt-2">
                {item.community}
              </Text>
            </View>
          )}
        />
        <CustomButton
          onPress={handleSubmit}
          gradient={!!selectedCommunity.length}
          title="Continue"
          _className="w-2/3"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
