import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, TextInput, Button, Text, Dimensions } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const ModalInput = forwardRef(({ attribute, userId }: any, ref: any) => {
  const [inputValue, setInputValue] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSave = async () => {
    if (userId) {
      (bottomSheetRef.current as any)?.close();
      const userRef = doc(db, "user", userId);
      const updatedAttribute = { [attribute]: inputValue };
      await updateDoc(userRef, updatedAttribute);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Your changes have been saved successfully!",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.collapse();
    },
  }));

  const snapPoints = useMemo(() => ["20%", "60%"], []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    []
  );

  return (
    <BottomSheet
      bottomInset={0.17 * SCREEN_HEIGHT}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      detached={true}
      containerHeight={200}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: "#411400",
        width: 50,
        height: 8,
      }}
      backgroundStyle={{
        backgroundColor: "#501901",
      }}
      style={{
        margin: 16,
        borderRadius: 24,
        shadowColor: "#000",
        backgroundColor: "#501901",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <BottomSheetView className="flex-1 items-center justify-center bg-[#712C0D]">
        <Text>{attribute}</Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          className="border-b  text-lg py-2 w-full"
        />
        <View className="mt-4">
          <Button title="Save" onPress={handleSave} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default ModalInput;
