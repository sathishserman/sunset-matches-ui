import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { db } from "@/firebase/firebase";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCommunities,
  setCommunities,
  updateUserSelections,
} from "../../../redux/actions";
import { RootState } from "../../../redux/interfaces";

const updateUserRecord = async (selectedCommunities: any) => {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    console.error("No user found");
    return;
  }
  const userRef = doc(db, "user", uid);
  try {
    await setDoc(userRef, { communities: selectedCommunities }, { merge: true });
    console.log("User record created or updated successfully");
  } catch (error) {
    console.error("Error creating or updating user record:", error);
  }
};

export default function Communities({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { communities, userSelections } = useSelector(
    (state: RootState) => state.communitiesState
  );
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  useEffect(() => {
    loadCommunities().then((communities) => {
      dispatch(setCommunities(communities));
    });
  }, []);

  const handleSubmit = async () => {
    if (selectedCommunities.length) {
      dispatch(updateUserSelections(selectedCommunities));
      updateUserRecord(selectedCommunities);
      navigation.navigate("DateTheme");
    }
  };

  const handleCommunityPress = (id: string) => {
    const isDuplicate = selectedCommunities.includes(id);
    if (isDuplicate) {
      setSelectedCommunities((prev) => prev.filter((c) => c !== id));
    } else if (selectedCommunities.length < 7) {
      setSelectedCommunities((prev) => [...prev, id]);
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
          className="w-full"
          maxItemsPerRow={3}
          contentContainerStyle={{
           marginTop: "auto",
           marginBottom: "auto"
          }}
          adjustGridToStyles
          data={communities?communities:[]}
          renderItem={({ item, index }) => (
            <View className="aspect-square items-center">
              <Pressable
                className={`border w-20 rounded-full overflow-hidden items-center aspect-square ${
                  selectedCommunities.includes(item.id)
                    ? "border-[#E25A28]"
                    : "border-white"
                }`}
                onPress={() => handleCommunityPress(item.id)}
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
          gradient={!!selectedCommunities.length}
          title="Continue"
          _className="w-2/3"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
