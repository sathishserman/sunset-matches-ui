import React, { createRef, useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

type DashedInputProps = {
  length: number;
  disabled?: boolean;
  formikProps: any;
  handleChange: (value: string, formikProps: any) => void;
};

const DashedInput = ({
  formikProps,
  length,
  disabled,
  handleChange,
}: DashedInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const value = Array(length).fill("");

  useEffect(() => {
    handleChange(inputValue, formikProps);
  }, [inputValue]);

  const onChangeValue = (text: string, index: number) => {
    const newInputValue = inputValue.split("");
    newInputValue[index] = text;
    setInputValue(newInputValue.join(""));
    handleChange(newInputValue.join(""), formikProps);
    console.log(newInputValue)
  };

  const handleInputChange = (text: string, index: number) => {
    onChangeValue(text, index);
    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackSpace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      handleInputChange("", index);
    }
  };

  return (
    <View className="flex-row justify-between gap-5">
      {[...new Array(length)].map((_, index) => {
        return (
          <TextInput
            ref={(ref) => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref];
              }
            }}
            key={index}
            maxLength={1}
            keyboardType="decimal-pad"
            selectTextOnFocus
            editable={!disabled}
            testID={`dashedInput${index}`}
            className="text-xl text-white text-center w-8 h-14 border-b border-[#898A8D]"
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={(event) => handleBackSpace(event, index)}
            autoFocus={index === 0}
          />
        );
      })}
    </View>
  );
};

export default DashedInput;
