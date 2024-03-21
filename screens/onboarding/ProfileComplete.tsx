import BackHeader from "@/components/BackHeader";
import React from "react";
import { View, Text } from "react-native";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { RootState } from "@/redux/interfaces";
import { connect } from "react-redux";
import CustomButton from "@/components/CustomButton";
import { AntDesign } from "@expo/vector-icons";

const ProfileComplete = ({
  name,
  navigation,
}: {
  name: string;
  navigation: any;
}) => {
  return (
    <CustomSafeAreaView>
      <View className="flex-1 items-center justify-between my-10 relative">
        <View>
          <Text className="text-5xl text-center font-robotoMedium mb-2 text-[#E25A28]">
            {name.split(" ")[0]},
          </Text>
          <Text className="font-robotoRegular text-center text-white text-lg">
            Your profile is complete!
          </Text>
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
          <View className="w-20 h-20 rounded-full bg-white"></View>
        </View>
        <CustomButton
          onPress={() => {
            // navigation.navigate("Main", { screen: "Swipe" });
            navigation.navigate("ProfilePic");
          }}
          title="Find your date"
          _className="w-4/6"
          icon={<AntDesign name="arrowright" size={24} color={"white"} />}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.nameState.name,
});

export default connect(mapStateToProps)(ProfileComplete);
