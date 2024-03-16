import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Formik, FormikProps, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setAge } from "@/redux/actions";
import BackHeader from "@/components/BackHeader";
import * as Yup from "yup";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/CustomButton";
import DashedInput from "../../components/DashedInput";
import { AgeFormValues } from "../../redux/interfaces";
import { RootState } from "../../redux/interfaces";
import {db } from '../../firebase/firebase';
import { doc , setDoc} from "firebase/firestore"; 
import auth from "@react-native-firebase/auth";

const ageSchema = Yup.object().shape({
  age: Yup.number()
    .min(18, "Age must be greater or equal to 0")
    .max(120, "Age must be less than or equal to 120")
    .required("Age is required")
    .integer("Age must be an integer")
    .typeError("Age must be a number"),
});

const updateUserRecord = async (uid:any, age:number) => {
  const userRef = doc(db, 'user', uid);
  try {
    setDoc(userRef, { age: age}, { merge: true });
    console.log('User record created or updated successfully');
  } catch (error) {
    console.error('Error creating or updating user record:', error);
  }
};

export default function Age({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const age = useSelector((state: RootState) => {
    return state.ageState.age;
  });

  const handleChange = (
    value: string,
    formikProps: FormikProps<AgeFormValues>
  ) => {
    if (value.length !== 3) {
      return formikProps.setFieldError("age", "Age must be 3 digits");
    }
    formikProps.handleChange("age")(value);
  };

  const formik = useFormik({
    initialValues: { age },
    validationSchema: ageSchema,
    onSubmit: (values) => {
      dispatch(setAge(values.age));
      navigation.navigate("Height");
    },
  });

  React.useEffect(() => {
    if (formik.touched.age && !formik.errors.age) {
      formik.handleSubmit();
    }
  }, [formik.touched.age, formik.errors.age]);

  return (
    <Formik
      initialValues={{ age }}
      validationSchema={ageSchema}
      onSubmit={(values) => {
        const uid:any = auth().currentUser?.uid;
        updateUserRecord(uid, values.age);
        dispatch(setAge(values.age));
        navigation.navigate("Height");
      }}
    >
      {(formikProps: FormikProps<AgeFormValues>) => (
        <CustomSafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="items-center justify-between mt-32 px-5 pb-5 flex-1"
          >
            <View className="w-full items-center">
              <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
                How old are you?
              </Text>
              <View>
                <DashedInput
                  length={3}
                  formikProps={formikProps}
                  handleChange={handleChange}
                />
              </View>
              {formikProps.touched.age && formikProps.errors.age && (
                <Text className="text-red-500 mt-2">
                  {formikProps.errors.age}
                </Text>
              )}
            </View>
            <CustomButton
              onPress={() => {
                formikProps.setFieldTouched("age", true, false);
                if (!formikProps.errors.age) {
                  formikProps.handleSubmit();
                }
              }}
              title="Continue"
              _className="w-4/6 mb-10"
              gradient={
                formikProps.values.age && !formikProps.errors.age
                  ? true
                  : undefined
              }
            />
          </KeyboardAvoidingView>
        </CustomSafeAreaView>
      )}
    </Formik>
  );
}
