import CustomButton from "@/components/CustomButton";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { setEmail, toggleSubscription } from "@/redux/actions";
import { EmailFormValues, RootState } from "@/redux/interfaces";
import auth from "@react-native-firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Formik, FormikProps } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { db } from '../../firebase/firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must be at most 255 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  subscribed: Yup.boolean(),
});


const updateUserRecord = async (uid:any, email:string, subscribed:boolean) => {
  const userRef = doc(db, 'user', uid);
  try {
    setDoc(userRef, { email: email, subscription: subscribed }, { merge: true });
    console.log('User record created or updated successfully');
  } catch (error) {
    console.error('Error creating or updating user record:', error);
  }
};


export default function Email({ navigation }: { navigation: any }) {
  const { email, subscribed } = useSelector(
    (state: RootState) => state.emailState
  );
  const dispatch = useDispatch();

  return (
    <>
      <CustomSafeAreaView>
        <Formik
          initialValues={{ email, subscribed }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const uid:any = auth().currentUser?.uid;
            updateUserRecord(uid, values.email, values.subscribed);
            dispatch(setEmail(values.email));
            dispatch(toggleSubscription(values.subscribed));
            navigation.navigate("Name");
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }: FormikProps<EmailFormValues>) => (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="items-center justify-between px-5 pb-5 flex-1"
            >
              <View className="w-full items-center mt-10">
                <Text className="text-3xl font-bold mb-2 text-[#E25A28]">
                  Your email address
                </Text>
                <Text className="text-[#898A8D] text-center">
                  Don't lose access to your account.
                </Text>
                <Text className="text-[#898A8D] text-center">
                  Verify your email address
                </Text>
                <TextInput
                  className="text-white border-b border-[#898A8D] w-[80%] mt-5 text-lg pb-2 text-center"
                  selectionColor={"#e25a2839"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoFocus
                />
                {touched.email && errors.email ? (
                  <Text className="text-red-500 mt-2">{errors.email}</Text>
                ) : null}
                <CheckBox
                  title="Send me Sunset Matches updates. You can unsubscribe at any point"
                  checked={values.subscribed}
                  onPress={() =>
                    setFieldValue("subscribed", !values.subscribed)
                  }
                  containerStyle={styles.checkbox}
                  textStyle={styles.checkboxLabel}
                  className="border border-sky-400"
                  checkedColor="#E25A28"
                  uncheckedColor="white"
                  size={15}
                  style={{ padding: 0 }}
                />
              </View>
              <CustomButton
                onPress={handleSubmit as any}
                title="Continue"
                gradient={values.email && !errors.email ? true : undefined}
                _className="w-5/6 mb-10"
              ></CustomButton>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </CustomSafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  error: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    color: "grey",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    width: "100%",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkboxLabel: {
    color: "white",
    fontFamily: "Roboto_300Light",
    fontWeight: "300",
    marginLeft: 2,
    marginRight: 0,
    fontSize: 9,
  },
  continueButton: {
    backgroundColor: "#DAA520",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
