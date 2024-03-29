import React from "react";
import * as Yup from "yup";
import { setHeight } from "@/redux/actions";
import BackHeader from "@/components/BackHeader";
import { useDispatch, useSelector } from "react-redux";
import DashedInput from "@/components/DashedInput";
import { Formik, FormikProps, useFormik } from "formik";
import CustomButton from "../../components/CustomButton";
import {db } from '../../firebase/firebase';
import { doc , setDoc} from "firebase/firestore"; 
import auth from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { HeightFormValues, RootState } from "../../redux/interfaces";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";

const heightSchema = Yup.object().shape({
  height: Yup.number()
    .min(50, "Height must be greater or equal to 50 cm")
    .max(272, "Height must be less than or equal to 272 cm")
    .required("Height is required")
    .typeError("Height must be a number"),
});

const updateUserRecord = async (uid:any, height:number) => {
  const userRef = doc(db, 'user', uid);
  try {
    setDoc(userRef, { height: height}, { merge: true });
    console.log('User record created or updated successfully');
  } catch (error) {
    console.error('Error creating or updating user record:', error);
  }
};

export default function Height({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const height = useSelector((state: RootState) => {
    return state.heightState.height;
  });

  const handleChange = (
    value: string,
    formikProps: FormikProps<HeightFormValues>
  ) => {
    if (value.length !== 3) {
      return formikProps.setFieldError("height", "Height must be 3 digits");
    }
    formikProps.handleChange("height")(value);
  };

  const formik = useFormik({
    initialValues: { height },
    validationSchema: heightSchema,
    onSubmit: (values) => {
      dispatch(setHeight(values.height));
      navigation.navigate("Height");
    },
  });

  React.useEffect(() => {
    if (formik.touched.height && !formik.errors.height) {
      formik.handleSubmit();
    }
  }, [formik.touched.height, formik.errors.height]);

  return (
    <Formik
      initialValues={{ height }}
      validationSchema={heightSchema}
      onSubmit={(values) => {
        const uid:any = auth().currentUser?.uid;
        updateUserRecord(uid, values.height);
        dispatch(setHeight(values.height));
        navigation.navigate("LocationScreen");
      }}
    >
      {(formikProps: FormikProps<HeightFormValues>) => (
        <CustomSafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="items-center justify-between mt-32 px-5 pb-5 flex-1"
          >
            <View className="w-full items-center ">
              <View className="mb-5">
                <Text className="text-3xl font-bold text-[#E25A28]">
                  What is your height?
                </Text>
                <Text className="text-[#E25A28]">in cm.</Text>
              </View>
              <View>
                <DashedInput
                  length={3}
                  formikProps={formikProps}
                  handleChange={handleChange}
                />
              </View>
              {formikProps.touched.height && formikProps.errors.height && (
                <Text className="text-red-500 mt-2">
                  {formikProps.errors.height}
                </Text>
              )}
            </View>
            <CustomButton
              onPress={() => {
                formikProps.setFieldTouched("height", true, false);
                if (!formikProps.errors.height) {
                  return formikProps.handleSubmit();
                }
              }}
              title="Continue"
              _className="w-4/6 mb-10"
              gradient={
                formikProps.values.height && !formikProps.errors.height
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
