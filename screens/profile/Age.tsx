import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setAge } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import DashedInput from "../../components/DashedInput"; // import DashedInput

export default function Age({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const ageSchema = Yup.number()
    .min(0, "Age must be greater or equal to 0")
    .max(120, "Age must be less than or equal to 120")
    .required("Age is required")
    .integer("Age must be an integer")
    .typeError("Age must be a number");

  const formik = useFormik({
    initialValues: { age: "" },
    validationSchema: ageSchema,
    onSubmit: (values) => {
      dispatch(setAge(Number(values.age)));
    },
  });

  const handleInputChange = (newValue: string) => {
    formik.setFieldValue("age", newValue);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#270C00]">
      <BackHeader color="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="items-center justify-between mt-32 px-5 pb-5 flex-1"
      >
        <View className="w-full items-center">
          <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
            How old are you?
          </Text>
          <View className="">
            <DashedInput
              length={3} // maximum age is 3 digits
              formikProps={formik}
              handleChange={handleInputChange}
            />
          </View>
          {formik.touched.age && formik.errors.age ? (
            <Text className="text-red-500 mt-2">{formik.errors.age}</Text>
          ) : null}
        </View>
        <CustomButton
          onPress={() => formik.handleSubmit()}
          title="Continue"
          _className="w-4/6 mb-10"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
