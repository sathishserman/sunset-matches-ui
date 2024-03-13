import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "./BackHeader";

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
