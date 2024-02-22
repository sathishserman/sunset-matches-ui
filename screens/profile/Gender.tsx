import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setGender } from '../../redux/actions';
import { RootState } from '../../redux/interfaces';  
import BackHeader from '../../components/BackHeader'; 

const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Please select your gender'),
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
    <>
    <BackHeader /> 

    <View style={styles.container}>
      
      <Text style={styles.title}>Your gender</Text>
      {['Female', 'Male', 'More'].map((gender) => (
        <TouchableOpacity
          key={gender}
          style={[
            styles.genderOption,
            formik.values.gender === gender && styles.selectedGenderOption,
          ]}
          onPress={() => formik.setFieldValue('gender', gender)}
        >
          <Text style={styles.genderText}>{gender}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.continueButton} onPress={formik.handleSubmit as any}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },
  title: {
    color: '#DAA520',
    fontSize: 24,
    marginBottom: 20,
  },
  genderOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: '#DAA520',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedGenderOption: {
    backgroundColor: '#DAA520',
  },
  genderText: {
    color: '#fff',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: '#DAA520',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
  }
});

export default GenderSelectionScreen;