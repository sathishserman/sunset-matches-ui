import React from "react";
import { View, Text } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../../redux/actions";
import { RootState } from "../../redux/interfaces";
import BackHeader from "../../components/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const validationSchema = Yup.object().shape({
  gender: Yup.string().required("Please select your gender"),
});

const GenderSelectionScreen = () => {
  const dispatch = useDispatch();
  const { gender } = useSelector((state: RootState) => state.genderState);
  const formik = useFormik({
    initialValues: { gender: gender },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setGender(values.gender));
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#270C00]">
      <BackHeader color="white" />
      <View className="flex-1 justify-between items-center mt-10">
        <View>
          <Text className="text-3xl font-bold mb-5 text-[#E25A28]">
            Your gender
          </Text>
          {["Female", "Male", "More"].map((gender) => (
            <CustomButton
              key={gender}
              onPress={() => formik.setFieldValue("gender", gender)}
              title={gender}
              _className={`w-4/6 mt-5 ${
                formik.values.gender === gender ? "bg-[#E25A28]" : ""
              }`}
            />
          ))}
        </View>
        <CustomButton
          onPress={formik.handleSubmit as any}
          title="Continue"
          _className="w-4/6 mb-10"
        />
      </View>
    </SafeAreaView>
  );
};

export default GenderSelectionScreen;
