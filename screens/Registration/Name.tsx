import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/actions";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { RootState, NameFormValues } from "../../redux/interfaces";
import BackHeader from "../../components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const nameValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Name is required"),
});

export default function Name({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.nameState.name);

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#411400]">
        <BackHeader color="white" />
        <Formik
          initialValues={{ name }}
          validationSchema={nameValidationSchema}
          onSubmit={(values: NameFormValues) => {
            dispatch(setName(values.name));
            navigation.navigate("LandingPage");
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }: FormikProps<NameFormValues>) => (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="items-center justify-between px-5 pb-5 flex-1"
            >
              <View className="w-full items-center mt-10">
                <Text className="text-3xl font-bold mb-2 text-[#E25A28]">
                  What is your name?
                </Text>
                <TextInput
                  className="text-white border-b border-[#898A8D] w-[80%] mt-5 text-lg pb-2 text-center"
                  autoCapitalize="words"
                  selectionColor={"#e25a2839"}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  keyboardType="default"
                  autoFocus
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500 mt-2">{errors.name}</Text>
                )}
              </View>
              <CustomButton
                onPress={handleSubmit as any}
                title="Continue"
                gradient={values.name && !errors.name ? true : undefined}
                _className="w-5/6 mb-10"
              ></CustomButton>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
}
