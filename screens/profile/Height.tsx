import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Formik, FormikProps, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setHeight } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import DashedInput from "../../components/DashedInput";
import { HeightFormValues, RootState } from "../../redux/interfaces";
import CustomButton from "../../components/CustomButton";

const heightSchema = Yup.object().shape({
  height: Yup.number()
    .min(50, "Height must be greater or equal to 50 cm")
    .max(272, "Height must be less than or equal to 272 cm")
    .required("Height is required")
    .typeError("Height must be a number"),
});

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
      console.log(value);
      return formikProps.setFieldError("height", "Height must be 3 digits");
    }
    formikProps.handleChange("height")(value);
  };

  return (
    <Formik
      initialValues={{ height }}
      validationSchema={heightSchema}
      onSubmit={(values) => {
        dispatch(setHeight(values.height));
        navigation.navigate("Height");
      }}
    >
      {(formikProps: FormikProps<HeightFormValues>) => (
        <SafeAreaView className="flex-1 bg-[#270C00]">
          <BackHeader color="white" />
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
              onPress={() => formikProps.handleSubmit()}
              title="Continue"
              _className="w-4/6 mb-10"
              gradient={
                formikProps.values.height && !formikProps.errors.height
                  ? true
                  : undefined
              }
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </Formik>
  );
}
