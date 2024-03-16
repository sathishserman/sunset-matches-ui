import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setDateLocation } from "@/redux/actions";

export default function DateLocation({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
    []
  );

  const locations = [
    "Upper Manhattan",
    "Lower Manhattan",
    "Upper East Side",
    "Upper West Side",
    "Midtown",
  ];

  const MAX_LOCATIONS = 3;

  const handleSubmit = () => {
    if (selectedLocations.length) {
      dispatch(setDateLocation(selectedLocations));
      navigation.navigate("Communities");
    }
  };

  const handleLocationPress = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations((prev) =>
        prev.filter((prevLocation) => prevLocation !== location)
      );
    } else if (selectedLocations.length < MAX_LOCATIONS) {
      setSelectedLocations((prev) => [...prev, location]);
    }
  };

  return (
    <CustomSafeAreaView>
      <View className="flex-1 justify-between items-center pb-10">
        <View className="items-center justify-center w-5/6">
          <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
            In which district do you want to date?
          </Text>
          <Text className="font-robotoLight text-white mt-3">Max. x3</Text>
        </View>
        <View className="w-full items-center">
          {locations.map((location, index) => {
            return (
              <Pressable
                className={`w-2/3 border rounded-full p-5 py-3 mt-7 items-center ${
                  selectedLocations.includes(location)
                    ? "border-[#E25A28]"
                    : "border-white"
                }`}
                onPress={() => handleLocationPress(location)}
                key={`location-${index}`}
              >
                <Text className="text-white font-robotoRegular text-lg">
                  {location}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <CustomButton
          onPress={handleSubmit}
          gradient={!!selectedLocations.length}
          title="Continue"
          _className="w-2/3"
          icon={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </CustomSafeAreaView>
  );
}
