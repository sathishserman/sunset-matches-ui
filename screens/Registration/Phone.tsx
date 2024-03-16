import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { useAuth } from "@/context/AuthContext";
import { setCountryCode, setPhoneNumber } from "@/redux/actions";
import { PhoneFormValues, RootState } from "@/redux/interfaces";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PhoneNumberInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { db } from "../../firebase/firebase";

const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[+]?[0-9]{8,15}$/, "Invalid phone number")
    .required("Phone number is required")
    .min(8, "Phone number must be at least 8 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
});

type PhoneRoutes = {
  Phone: {
    flow: string;
  };
};

const updateUserRecord = async (uid: any, formattedNumber: string) => {
  const userRef = doc(db, "user", uid);
  try {
    setDoc(userRef, { phone: formattedNumber }, { merge: true });
    console.log("User record created or updated successfully");
  } catch (error) {
    console.error("Error creating or updating user record:", error);
  }
};

export default function Phone({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((state: RootState) => state.phoneState);
  const phoneInput = React.useRef<PhoneNumberInput>(null);
  const route = useRoute();
  const { setConfirmationResult } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);

  const signInWithPhoneNumber = async (formattedNumber: string) => {
    try {
      const confirmation: FirebaseAuthTypes.ConfirmationResult =
        await auth().signInWithPhoneNumber(formattedNumber);
      if (confirmation) {
        const uid: any = auth().currentUser?.uid;
        setConfirmationResult(confirmation);
        if (!auth().currentUser) {
          navigation.navigate("Verification", {
            flow: route.params.flow,
          });
        } else {
          updateUserRecord(uid, formattedNumber);
          setConfirmationResult(confirmation);
          // navigation.navigate("Location", {
          //   flow: route.params.flow,
          // });
        }
      }
    } catch (error) {
      console.log("Error Sending Code: ", error);
    }
  };

  const handleSubmit = async (
    values: PhoneFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<PhoneFormValues>
  ) => {
    setLoading(true);
    const isValid = phoneInput.current?.isValidNumber(values.phoneNumber);
    const callingCode = phoneInput.current?.getCallingCode();
    const formattedNumber =
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
        .formattedNumber;
    if (isValid && callingCode && formattedNumber) {
      dispatch(setPhoneNumber(values.phoneNumber));
      dispatch(setCountryCode(`+${callingCode}`));

      try {
        await signInWithPhoneNumber(formattedNumber);
        navigation.navigate("Verification", {
          flow: route.params.flow,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      setFieldError("phoneNumber", "Please enter a valid phone number");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ phoneNumber }}
        validationSchema={phoneValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps: FormikProps<PhoneFormValues>) => (
          <CustomSafeAreaView>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="items-center justify-between px-5 pb-10 flex-1"
            >
              <View className="w-full items-center mt-10">
                <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
                  Your phone numbers
                </Text>
                <PhoneNumberInput
                  flagButtonStyle={styles.flagButtonStyle}
                  containerStyle={styles.commonContainerStyle}
                  textContainerStyle={{
                    ...styles.commonContainerStyle,
                    alignSelf: "center",
                  }}
                  textInputProps={{
                    selectionColor: "#e25a2839",
                    autoFocus: true,
                  }}
                  placeholder=" "
                  textInputStyle={styles.textInputStyle}
                  codeTextStyle={styles.codeTextStyle}
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode={"US" as const}
                  layout="first"
                  onChangeText={(text) =>
                    formikProps.setFieldValue("phoneNumber", text)
                  }
                  withShadow
                  autoFocus
                />
                {formikProps.touched.phoneNumber &&
                  formikProps.errors.phoneNumber && (
                    <Text className="text-sm text-red-600 mt-1">
                      {formikProps.errors.phoneNumber}
                    </Text>
                  )}
              </View>

              <View className="w-5/6 items-center">
                <Text className="text-sm text-[#898A8D]">
                  Check your phone for the verification code
                </Text>
                <CustomButton
                  onPress={formikProps.handleSubmit as any}
                  title={loading ? "Loading..." : "Continue"}
                  _className="mt-5 mb-5"
                  gradient={
                    formikProps.values.phoneNumber &&
                    !formikProps.errors.phoneNumber
                      ? true
                      : undefined
                  }
                />
              </View>
            </KeyboardAvoidingView>
          </CustomSafeAreaView>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  commonContainerStyle: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    height: 50,
    width: "80%",
    marginVertical: 10,
    paddingVertical: 10,
  },
  flagButtonStyle: {
    borderRadius: 100,
    backgroundColor: "white",
  },
  textInputStyle: {
    color: "white",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#898A8D",
  },
  codeTextStyle: {
    color: "white",
    fontSize: 20,
  },
});
