import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-toast-message";

type BioProfileItemProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  rounded?: "top" | "bottom" | "both" | "none";
};

const BioProfileItem: React.FC<BioProfileItemProps> = ({
  label,
  value,
  onSave,
  rounded = "none",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  let borderRadiusClasses = "";
  if (rounded === "top") {
    borderRadiusClasses = "rounded-t-xl";
  } else if (rounded === "bottom") {
    borderRadiusClasses = "rounded-b-xl";
  } else if (rounded === "both") {
    borderRadiusClasses = "rounded-xl";
  }

  const handleSave = () => {
    if (editValue !== "") {
      onSave(editValue);
      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Your changes have been saved successfully!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Not Saved",
        text2: "Please enter a value before saving.",
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      className={`bg-[#712C0D] p-4 my-[1px] flex-row justify-between items-center ${borderRadiusClasses}`}
    >
      {isEditing ? (
        <TextInput
          value={editValue}
          onChangeText={setEditValue}
          multiline={true}
          maxLength={200}
          autoFocus={true}
          onBlur={handleSave}
          style={{
            flex: 1,
            color: "#E25A28",
            height: "auto",
            maxHeight: 72,
          }}
          numberOfLines={2}
        />
      ) : (
        <Text className="text-[#E25A28] text-[16px] font-robotoMedium">
          {value}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BioProfileItem;
