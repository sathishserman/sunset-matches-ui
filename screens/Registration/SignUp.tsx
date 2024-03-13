import BackHeader from "@/components/BackHeader";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  inputMode?:
    | "decimal"
    | "email"
    | "none"
    | "numeric"
    | "search"
    | "tel"
    | "text"
    | "url";
};

export const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  inputMode,
}: InputFieldProps) => {
  return (
    <View className="w-5/6 mb-7">
      {/* <Text className="mb-1">{label}</Text> */}
      <TextInput
        className="h-10 border-b border-white text-white"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={"#fff"}
        inputMode={inputMode ? inputMode : "text"}
      />
    </View>
  );
};

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <CustomSafeAreaView>
      <View className="flex-1">
        <View className="justify-center items-center py-10">
          <Text className="font-bold text-4xl text-white">Join Us</Text>
        </View>
        <View className="px-5 flex-col items-center justify-center">
          <InputField label="Name" value={name} onChangeText={setName} />
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            inputMode="email"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Pressable className="bg-white w-5/6 items-center py-3 rounded-lg">
            <Text className="text-[#FFA29A] font-bold">Sign Up</Text>
          </Pressable>
          <View className="flex-row items-center my-10 w-5/6">
            <View className="flex-1 h-[1.5] bg-white"></View>
            <Text className="text-white mx-3 leading-4">or</Text>
            <View className="flex-1 h-[1.5] bg-white"></View>
          </View>
          <Pressable className="bg-white w-5/6 items-center py-3 rounded-lg">
            <Text className="text-[#FFA29A] font-bold">
              Sign Up with Google
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff",
  },
  dividerText: {
    color: "#fff",
    marginHorizontal: 10,
  },
});
