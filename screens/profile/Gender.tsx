import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../../redux/actions";
import { RootState } from "../../redux/interfaces";
import BackHeader from "../../components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {db } from '../../firebase/firebase';
import { doc , setDoc} from "firebase/firestore"; 
import auth from "@react-native-firebase/auth";

const validationSchema = Yup.object().shape({
  gender: Yup.string().required("Please select your gender"),
});

const updateUserRecord = async (uid:any, gender:string) => {
  const userRef = doc(db, 'user', uid);
  try {
    setDoc(userRef, { gender: gender}, { merge: true });
    console.log('User record created or updated successfully');
  } catch (error) {
    console.error('Error creating or updating user record:', error);
  }
};

const GenderSelectionScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { gender } = useSelector((state: RootState) => state.genderState);
  const formik = useFormik({
    initialValues: { gender: gender },
    validationSchema,
    onSubmit: (values) => {
      const uid:any = auth().currentUser?.uid;
      updateUserRecord(uid, values.gender);
      dispatch(setGender(values.gender));
      navigation.navigate("Age");
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#270C00]">
      <BackHeader color="white" />
      <View className="flex-1 justify-between items-center mt-32">
        <View className="w-full items-center">
          <Text className="text-3xl font-bold text-[#E25A28]">Your gender</Text>
          {["Female", "Male", "More"].map((gender) => (
            <CustomButton
              key={gender}
              onPress={() => formik.setFieldValue("gender", gender)}
              title={gender}
              _className={`w-4/6 mt-5 ${
                formik.values.gender === gender ? "bg-[#E25A28]" : ""
              }`}
            />
          ))}
        </View>
        <CustomButton
          onPress={formik.handleSubmit as any}
          title="Continue"
          _className="w-4/6 mb-[60px]"
        />
      </View>
    </SafeAreaView>
  );
};

export default GenderSelectionScreen;
