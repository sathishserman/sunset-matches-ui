import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-toast-message";

type ProfileItemProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void; // Added onSave to handle saving changes
  rounded?: "top" | "bottom" | "both" | "none";
};

const ProfileItem: React.FC<ProfileItemProps> = ({
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
      <Text className="text-white text-[16px] font-robotoMedium">{label}</Text>
      {isEditing ? (
        <>
          <TextInput
            value={editValue}
            onChangeText={setEditValue}
            autoFocus={true}
            style={{
              color: "#E25A28",
              flex: 1,
              marginRight: 10,
              textAlign: "right",
            }}
            onBlur={handleSave}
          />
        </>
      ) : (
        <Text className="text-[#E25A28] text-[16px] font-robotoMedium">
          {value}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ProfileItem;