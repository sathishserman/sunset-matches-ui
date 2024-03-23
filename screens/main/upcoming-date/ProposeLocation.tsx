import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categories = ["Pizza", "Sushi", "Drinks", "Rooftop", "Coffee"];
const items = [
  {
    id: "1",
    title: "SOJA SUSHI",
    description: "2 free cocktails",
    price: "50-200 $",
    distance: "2 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Sushi",
  },
  {
    id: "2",
    title: "AIOLI PIZZA",
    description: "2 free shots",
    price: "50-100 $",
    distance: "1 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Pizza",
  },
  {
    id: "4",
    title: "CAFE LATTE",
    description: "Buy 1 get 1 free on coffee",
    price: "5-10 $",
    distance: "500 m",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Coffee",
  },
  {
    id: "5",
    title: "THE ROOFTOP BAR",
    description: "Happy hour from 5pm to 7pm",
    price: "20-50 $",
    distance: "1.5 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Rooftop",
  },
  {
    id: "6",
    title: "SUSHI EXPRESS",
    description: "All-you-can-eat sushi buffet",
    price: "30-40 $",
    distance: "2.5 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Sushi",
  },
  {
    id: "7",
    title: "THE COCKTAIL LOUNGE",
    description: "2-for-1 cocktails on Fridays",
    price: "15-25 $",
    distance: "1.2 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Drinks",
  },
  {
    id: "8",
    title: "PIZZA HUT",
    description: "Family meal deal for 4",
    price: "40-60 $",
    distance: "4 km",
    imageUrl: "https://picsum.photos/seed/696/3000/2000",
    category: "Pizza",
  },
];

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ProposeLocation = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const matchTitle = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory = item.category === selectedCategory;
    return matchTitle && matchCategory;
  });

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      title: string;
      description: string;
      price: string;
      distance: string;
      imageUrl: string;
    };
  }) => (
    <View className="flex-1 w-full h-[27vh] rounded-2xl overflow-hidden">
      <View className="h-full w-full">
        <Image
          source={item.imageUrl}
          placeholder={blurhash}
          contentFit="fill"
          transition={100}
          className="flex-1 h-full"
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <View className="justify-between flex-row">
          <View>
            <Text className="text-2xl font-bold text-orange-600 max-w-[99%] ">
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </View>
          <View className="">
            <Text className="bg-yellow-600 self-end p-1 rounded-md">
              {item.price}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-yellow-600 p-2 self-start rounded-xl">
          <Text className="text-xl font-bold">Propose</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  interface CategoryButtonProps {
    category: string;
  }

  const renderCategory = (category: string) => (
    <TouchableOpacity
      key={category}
      className={`p-1 pt-3 ${
        selectedCategory === category ? "border-b-2 border-white" : ""
      }`}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        className={`text-white font-robotoLight ${
          selectedCategory === category ? "font-robotoBold" : ""
        }`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="items-center px-5 pb-5 flex-1"
      >
        <View className="w-full flex-row items-center">
          <TextInput
            className="flex-1 p-2 pl-4 bg-[#5A0000] rounded-2xl text-white"
            placeholder="Search..."
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View className="mb-4 flex-row w-full items-center justify-between">
          {categories.map((category) => renderCategory(category))}
        </View>
        <View className="w-full">
          <FlatList
            data={filteredItems}
            renderItem={(item) => {
              console.log(item);
              return renderItem(item);
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              flexGrow: 1,
              gap: 10,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default ProposeLocation;
