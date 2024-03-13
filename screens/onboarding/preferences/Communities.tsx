import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { Image } from "expo-image";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";

type Community = {
  community: string;
  image: any;
};

export default function Communities() {
  const [selectedCommunity, setSelectedCommunity] = React.useState<Community[]>(
    []
  );

  const communities = [
    { community: "Black", image: require("@/assets/communities/black.png") },
    { community: "Latino", image: require("@/assets/communities/latino.png") },
    { community: "Asian", image: require("@/assets/communities/asian.png") },
    { community: "Jewish", image: require("@/assets/communities/jewish.png") },
    { community: "Muslim", image: require("@/assets/communities/muslim.png") },
    {
      community: "Veteran",
      image: require("@/assets/communities/veteran.png"),
    },
    { community: "LGBTQ+", image: require("@/assets/communities/lgbtq.png") },
    {
      community: "Disabled",
      image: require("@/assets/communities/disabled.png"),
    },
    {
      community: "Christian",
      image: require("@/assets/communities/christian.png"),
    },
  ];

  const handleCommunityPress = (community: Community, index: number) => {
    const isDuplicate = selectedCommunity.some(
      (selected) => selected.community === community.community
    );

    console.log("Duplicate", isDuplicate);
    console.log("Selected", selectedCommunity);
    console.log("Community", community);

    if (isDuplicate) {
      setSelectedCommunity((prev) =>
        prev.filter(
          (prevCommunity) => prevCommunity.community !== community.community
        )
      );
    } else if (selectedCommunity.length < 7) {
      setSelectedCommunity((prev) => [...prev, community]);
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
          renderItem={({ item: community, index }) => (
            <View className="aspect-square items-center">
              <Pressable
                className={`border w-20 rounded-full overflow-hidden items-center aspect-square ${
                  selectedCommunity.some(
                    (selected) => selected.community === community.community
                  )
                    ? "border-[#E25A28]"
                    : "border-white"
                }`}
                onPress={() => handleCommunityPress(community, index)}
                key={`community-${index}`}
              >
                <Image
                  source={community.image}
                  className="w-full h-full p-0 scale-[.85] rounded-full"
                />
              </Pressable>
              <Text className="text-white font-robotoRegular text-xs mt-2">
                {community.community}
              </Text>
            </View>
          )}
        />
        <CustomButton
          onPress={() => {}}
          gradient={!!selectedCommunity.length}
          title="Continue"
          _className="w-2/3"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
