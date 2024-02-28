import { TextInput, View } from "react-native";

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
