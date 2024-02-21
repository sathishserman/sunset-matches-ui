import React,{useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { RootState, VerificationFormValues } from '../../redux/interfaces';
import { setVerificationCode } from '../../redux/actions';
import BackHeader from '../../components/BackHeader';
import { useRoute, RouteProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../context/AuthContext';

const verificationCodeValidationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required('Verification code is required')
    .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits'),
});

type VerificationRoutes = {
    Verification: {
        flow: string;
            };
};

export default function Verification({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const verificationCode = useSelector((state: RootState) => state.verificationState.verificationCode);
  const route = useRoute<RouteProp<VerificationRoutes, 'Verification'>>();
  const { confirmationResult } = useAuth();


  function onAuthStateChanged(user:any) {
    if (user) {
      navigation.navigate('Email');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function confirmCode(code:string) {
    try {
      if(confirmationResult!=null){
        await confirmationResult.confirm(code);
        navigation.navigate('Email');
      }
      
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <>
      <BackHeader />
      <Formik
        initialValues={{ verificationCode }}
        validationSchema={verificationCodeValidationSchema}
        onSubmit={(values) => {
          dispatch(setVerificationCode(values.verificationCode));
          if(route.params.flow==='signupFlow'){
            confirmCode(values.verificationCode);
            
          }
        }}
      >
        {(formikProps: FormikProps<VerificationFormValues>) => (
          <View style={styles.container}>
            <Text style={styles.prompt}>Enter your code</Text>
            <TextInput
              style={styles.input}
              onChangeText={formikProps.handleChange('verificationCode')}
              onBlur={formikProps.handleBlur('verificationCode')}
              value={formikProps.values.verificationCode}
              placeholder="------"
              keyboardType="number-pad"
              maxLength={6}
              returnKeyType="done"
            />
            {formikProps.touched.verificationCode && formikProps.errors.verificationCode && (
              <Text style={styles.errorText}>{formikProps.errors.verificationCode}</Text>
            )}
            <TouchableOpacity onPress={formikProps.handleSubmit as any} style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>Check your phone for the verification code</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DAA520',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    color: '#DAA520',
    borderBottomColor: '#DAA520',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
    letterSpacing: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
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
  infoText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  }
});