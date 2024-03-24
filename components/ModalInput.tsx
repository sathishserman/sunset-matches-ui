import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

const ModalInput = ({ visible, onClose, attribute, userId }: any) => {
  const [inputValue, setInputValue] = useState("");


  const handleSave = async () => {
    if (userId) {
      onClose(); // Close the modal immediately
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.modalInput}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#E25A28", // Light orange for underline
    color: "black", // or any color you want for the text
    fontSize: 18,
    padding: 8,
    width: "100%", // You might want to adjust this based on your modal size
    // Add other styles for input like margin if needed
  },
});

export default ModalInput;
