import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { BioFormValues, RootState } from "@/redux/interfaces";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Formik, FormikProps } from "formik";
import { db } from "@/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setBio } from "@/redux/actions";

const bioValidationSchema = Yup.object().shape({
  bio: Yup.string()
    .max(40, "Bio must be at most 40 characters")
    .required("Bio is required"),
});

const updateUserRecord = async (uid: any, bio: string) => {
  const userRef = doc(db, "user", uid);
  try {
    setDoc(userRef, { bio: bio }, { merge: true });
    console.log("User record created or updated successfully");
  } catch (error) {
    console.error("Error creating or updating user record:", error);
  }
};

export default function Bio({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const bio = useSelector((state: RootState) => state.bioState.bio);

  return (
    <CustomSafeAreaView>
      <Formik
        initialValues={{ bio }}
        validationSchema={bioValidationSchema}
        onSubmit={(values: BioFormValues) => {
          console.log("values", values);
          const uid: any = auth().currentUser?.uid;
          updateUserRecord(uid, values.bio);
          dispatch(setBio(values.bio));
          navigation.navigate("ProfileComplete");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }: FormikProps<BioFormValues>) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="items-center justify-between px-5 pb-5 flex-1"
          >
            <View className="items-center justify-center w-5/6">
              <Text className="font-robotoMedium text-3xl text-[#E25A28] text-center">
                Your bio
              </Text>
            </View>
            <View className="w-5/6 h-32 items-center justify-center">
              <Shadow
                distance={34}
                startColor={"#E68A323F"}
                endColor={"#E25A2801"}
                paintInside
                style={{
                  borderRadius: 100,
                  //   width: "100%",
                  // height: 160,
                }}
              >
                <View className="border border-[#E25A28] w-[83vw] h-full rounded-2xl justify-center">
                  <TextInput
                    className="text-white text-lg px-10"
                    autoCapitalize="words"
                    selectionColor={"#ffffff"}
                    onChangeText={handleChange("bio")}
                    onBlur={handleBlur("bio")}
                    value={values.bio}
                    keyboardType="default"
                    multiline
                    autoFocus
                  />
                </View>
                {touched.bio && errors.bio ? (
                  <Text className="text-red-500 mt-2">{errors.bio}</Text>
                ) : (
                  <Text className="text-white mt-2">40 characters max</Text>
                )}
              </Shadow>
            </View>
            {/* </View> */}
            <CustomButton
              onPress={handleSubmit as any}
              gradient={values.bio && !errors.bio ? true : undefined}
              title="Continue"
              _className="w-5/6 mb-10"
              icon={<AntDesign name="arrowright" size={24} color="white" />}
            />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </CustomSafeAreaView>
  );
}
