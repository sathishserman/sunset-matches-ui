import React, { useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { RootState, VerificationFormValues } from "../../redux/interfaces";
import { setVerificationCode } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaAndroidIOS } from "../../components/SafeAreaAndroidIOS";
import VerificationInput from "../../components/VerificationInput";
import CustomButton from "../../components/CustomButton";

const verificationCodeValidationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});

type VerificationRoutes = {
  Verification: {
    flow: string;
  };
};

export default function Verification({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const verificationCode = useSelector(
    (state: RootState) => state.verificationState.verificationCode
  );
  const route = useRoute<RouteProp<VerificationRoutes, "Verification">>();
  const { confirmationResult } = useAuth();

  function onAuthStateChanged(user: any) {
    if (user) {
      navigation.navigate("Email");
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function confirmCode(code: string) {
    try {
      if (confirmationResult != null) {
        await confirmationResult.confirm(code);
        navigation.navigate("Email");
      }
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  return (
    <>
      <Formik
        initialValues={{ verificationCode }}
        validationSchema={verificationCodeValidationSchema}
        onSubmit={(values) => {
          dispatch(setVerificationCode(values.verificationCode));
          if (route.params.flow === "signupFlow") {
            confirmCode(values.verificationCode);
          }
        }}
      >
        {(formikProps: FormikProps<VerificationFormValues>) => (
          <SafeAreaAndroidIOS className="flex-1 bg-[#270C00]">
            <BackHeader color="white" />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="items-center justify-between px-5 pb-10 flex-1"
            >
              <View className="w-full items-center mt-10">
                <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
                  Enter your code
                </Text>
                <View className="w-4/6">
                  <VerificationInput formikProps={formikProps} length={6} />
                  <Text className="underline text-[#898A8D] mt-3">
                    Try again
                  </Text>
                </View>
                {formikProps.touched.verificationCode &&
                  formikProps.errors.verificationCode && (
                    <Text className="text-red-500 mt-2">
                      {formikProps.errors.verificationCode}
                    </Text>
                  )}
              </View>
              <View className="w-5/6 items-center">
                <Text className="text-sm text-[#898A8D]">
                  Check your phone for the verification code
                </Text>
                <CustomButton
                  onPress={formikProps.handleSubmit as any}
                  _className="mt-5 mb-5"
                  title="Continue"
                  gradient={
                    formikProps.values.verificationCode &&
                    !formikProps.errors.verificationCode
                      ? true
                      : undefined
                  }
                />
              </View>
            </KeyboardAvoidingView>
          </SafeAreaAndroidIOS>
        )}
      </Formik>
    </>
  );
}
