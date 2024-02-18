import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../redux/actions';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { RootState, NameFormValues } from '../../redux/interfaces';
import BackHeader from '../../components/BackHeader'; 

const nameValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
    .required('Name is required'),
});

export default function Name({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.nameState.name);

  return (
    <>
    <BackHeader />
    <Formik
      initialValues={{ name }}
      validationSchema={nameValidationSchema}
      onSubmit={(values: NameFormValues) => {
        dispatch(setName(values.name));

        navigation.navigate('LandingPage');
       
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: FormikProps<NameFormValues>) => (
        <View style={styles.container}>
          <Text style={styles.prompt}>What is your name?</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Type your name"
            keyboardType="default"
          />
          {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TouchableOpacity onPress={handleSubmit as any} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  prompt: {
    color: '#DAA520',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#DAA520',
    borderBottomWidth: 1,
    color: 'white',
    width: '100%',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#DAA520',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});