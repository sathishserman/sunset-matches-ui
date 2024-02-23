import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setAge } from '../../redux/actions';
import BackHeader from '../../components/BackHeader';
import * as Yup from 'yup';

export default function Age({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const ageSchema = Yup.number()
  .min(0, 'Age must be greater or equal to 0')
  .max(120, 'Age must be less than or equal to 120')
  .required('Age is required')
  .integer('Age must be an integer')
  .typeError('Age must be a number');

  const formik = useFormik({
    initialValues: { age: '' },
    validationSchema: ageSchema,
    onSubmit: (values) => {
      dispatch(setAge(Number(values.age)));
    },
  });

  return (
    <>
    <BackHeader />
    <View style={styles.container}>
      
      <Text style={styles.title}>How old are you?</Text>
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={formik.handleChange('age')}
        onBlur={formik.handleBlur('age')}
        value={formik.values.age}
        placeholder='Enter your age'
      />
      {formik.touched.age && formik.errors.age ? (
        <Text style={styles.errorText}>{formik.errors.age}</Text>
      ) : null}
      <TouchableOpacity style={styles.continueButton} onPress={() => formik.handleSubmit()}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', 
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: '#fff',
    fontSize: 24,
    borderBottomColor: '#DAA520',
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#DAA520',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  }
});