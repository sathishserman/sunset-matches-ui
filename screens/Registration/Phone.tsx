import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { RootState, PhoneFormValues } from "../../redux/interfaces";
import { setCountryCode, setPhoneNumber } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import PhoneNumberInput from "react-native-phone-number-input";
// import auth from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
import { SafeAreaAndroidIOS } from "../../components/SafeAreaAndroidIOS";
import CustomButton from "../../components/CustomButton";

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

export default function Phone({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((state: RootState) => state.phoneState);
  const phoneInput = React.useRef<PhoneNumberInput>(null);
  const route = useRoute<RouteProp<PhoneRoutes, "Phone">>();

  // const signInWithPhoneNumber = async (formatteNumber: string) => {
  //   try {
  //     const confirmation = await auth().signInWithPhoneNumber(formatteNumber);
  //     console.log(confirmation);
  //   } catch (error) {
  //     console.log("Error Sending Code: ", error);
  //   }
  // };

  const handleSubmit = (
    values: PhoneFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<PhoneFormValues>
  ) => {
    const isValid = phoneInput.current?.isValidNumber(values.phoneNumber);
    const callingCode = phoneInput.current?.getCallingCode();
    const formattedNumber =
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
        .formattedNumber;
    if (isValid && callingCode && formattedNumber) {
      dispatch(setPhoneNumber(values.phoneNumber));

      dispatch(setCountryCode(`+${callingCode}`));

      console.log(`+${callingCode}`);
      console.log(values.phoneNumber);

      try {
        // signInWithPhoneNumber(formattedNumber);
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
          <SafeAreaAndroidIOS className="flex-1 bg-[#270C00]">
            <BackHeader color="white" />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="items-center justify-between px-5 pb-10 flex-1"
            >
              <View className="w-full items-center mt-10">
                <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
                  Your phone number
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
                  title="Continue"
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
          </SafeAreaAndroidIOS>
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
