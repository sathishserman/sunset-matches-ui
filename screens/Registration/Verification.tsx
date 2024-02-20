import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { RootState, VerificationFormValues } from "../../redux/interfaces";
import { setVerificationCode } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaAndroidIOS } from "../../components/SafeAreaAndroidIOS";
import CustomButton from "../../components/CustomButton";
import VerificationInput from "../../components/VerificationInput";

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
  return (
    <>
      <Formik
        initialValues={{ verificationCode }}
        validationSchema={verificationCodeValidationSchema}
        onSubmit={(values) => {
          dispatch(setVerificationCode(values.verificationCode));
          if (route.params.flow === "signupFlow") {
            navigation.navigate("Email");
          }
        }}
      >
        {(formikProps: FormikProps<VerificationFormValues>) => (
          <SafeAreaAndroidIOS className="flex-1 bg-[#270C00]">
            <BackHeader color="white" />
            <View className="items-center justify-between px-5 pb-10 flex-1">
              <View className="w-full items-center">
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
                    <Text style={styles.errorText}>
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
                  _className="mt-5"
                  title="Continue"
                  gradient={
                    formikProps.values.verificationCode &&
                    !formikProps.errors.verificationCode
                      ? true
                      : undefined
                  }
                />
              </View>
            </View>
          </SafeAreaAndroidIOS>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  prompt: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DAA520",
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    color: "#DAA520",
    borderBottomColor: "#DAA520",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "80%",
    textAlign: "center",
    letterSpacing: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: "#DAA520",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
  },
  infoText: {
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  },
});
