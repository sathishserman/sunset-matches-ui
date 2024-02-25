import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setHeight } from '../../redux/actions';
import BackHeader from '../../components/BackHeader';
import * as Yup from 'yup';

export default function Height({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const heightSchema = Yup.number()
    .min(50, 'Height must be greater or equal to 50 cm')
    .max(272, 'Height must be less than or equal to 272 cm')
    .required('Height is required')
    .typeError('Height must be a number');

  const formik = useFormik({
    initialValues: { height: '' },
    validationSchema: heightSchema,
    onSubmit: (values) => {
      dispatch(setHeight(Number(values.height)));
      navigation.navigate('');
  
    },
  });

  return (
    <>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.title}>What is your height in centimeters?</Text>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          onChangeText={formik.handleChange('height')}
          onBlur={formik.handleBlur('height')}
          value={formik.values.height}
          placeholder='Enter your height in cm'
        />
        {formik.touched.height && formik.errors.height ? (
          <Text style={styles.errorText}>{formik.errors.height}</Text>
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