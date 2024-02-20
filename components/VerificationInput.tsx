import React, { createRef, useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

type OTPInputProps = {
  length: number;

  disabled?: boolean;
  formikProps: any;
};

const VerificationInput = ({
  formikProps,
  length,

  disabled,
}: OTPInputProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const value = Array(length).fill("");

  useEffect(() => {
    formikProps.handleChange("verificationCode")(verificationCode);
  }, [verificationCode]);

  const onChangeValue = (text: string, index: number) => {
    const newValue = value.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }
      return item;
    });

    const newVerificationCode =
      verificationCode.slice(0, index) +
      text +
      verificationCode.slice(index + 1);
    setVerificationCode(newVerificationCode);
    formikProps.handleChange("verificationCode")(newVerificationCode);
  };

  const handleChange = (text: string, index: number) => {
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
      handleChange("", index);
    }
  };

  return (
    <View className="w-full flex-row justify-between">
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
            testID={`otpInput${index}`}
            className="text-xl text-white text-center w-8 h-14 border-b border-[#898A8D]"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleBackSpace(event, index)}
            autoFocus={index === 0}
          />
        );
      })}
    </View>
  );
};

export default VerificationInput;
