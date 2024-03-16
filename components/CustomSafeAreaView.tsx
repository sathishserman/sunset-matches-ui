import React from "react";
import BackHeader from "./BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

type CustomSafeAreaViewProps = {
  children: React.ReactNode;
};

const CustomSafeAreaView = ({ children }: CustomSafeAreaViewProps) => (
  <SafeAreaView className="flex-1 bg-[#411400]">
    <BackHeader color="white" />
    {children}
  </SafeAreaView>
);

export default CustomSafeAreaView;
