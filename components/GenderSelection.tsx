import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const GenderOption = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => onSelect(label)}
    style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
  >
    {selected ? (
      <Ionicons name="checkmark-circle" size={24} color="#E25A28" />
    ) : (
      <Feather name="circle" size={24} color="#E25A28" />
    )}
    <Text className="ml-1 text-lg text-[#E25A28]">{label}</Text>
  </TouchableOpacity>
);

const GenderSelection = ({
  selectedGender,
  onSelectGender,
}: {
  selectedGender: string;
  onSelectGender: (label: string) => void;
}) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 10,
    }}
  >
    <GenderOption
      label="Male"
      selected={selectedGender === "Male"}
      onSelect={onSelectGender}
    />
    <GenderOption
      label="Female"
      selected={selectedGender === "Female"}
      onSelect={onSelectGender}
    />
    <GenderOption
      label="Other"
      selected={selectedGender === "Other"}
      onSelect={onSelectGender}
    />
  </View>
);

export default GenderSelection;
