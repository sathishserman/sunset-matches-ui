import React, {createContext, useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { RootState , PhoneFormValues} from '../../redux/interfaces'; 
import { setCountryCode, setPhoneNumber } from '../../redux/actions';
import BackHeader from '../../components/BackHeader';
import PhoneNumberInput, { PhoneInputProps } from 'react-native-phone-number-input'; 
import auth,{ FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';


const phoneValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
    .matches(
      /^[+]?[0-9]{8,15}$/,
      'Invalid phone number'
    )
    .required('Phone number is required')
    .min(8, 'Phone number must be at least 8 characters')
    .max(15, 'Phone number cannot exceed 15 characters')
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
    const route = useRoute<RouteProp<PhoneRoutes, 'Phone'>>();
    const { setConfirmationResult } = useAuth();



    const signInWithPhoneNumber = async (formattedNumber: string) => {
        try{
            const confirmation:FirebaseAuthTypes.ConfirmationResult = await auth().signInWithPhoneNumber(formattedNumber);
            if(confirmation){
                setConfirmationResult(confirmation);
                navigation.navigate('Verification',{
                    flow: route.params.flow
                });
            }
        }catch(error){
            console.log("Error Sending Code: ", error);
        }
    }
  
    return (
      <>
        <BackHeader />
        <Formik
          initialValues={{ phoneNumber }}
          validationSchema={phoneValidationSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
        
            const isValid = phoneInput.current?.isValidNumber(values.phoneNumber);
            const callingCode = phoneInput.current?.getCallingCode();
            const formattedNumber = phoneInput.current?.getNumberAfterPossiblyEliminatingZero().formattedNumber;
                if (isValid && callingCode && formattedNumber) {
                
                    dispatch(setPhoneNumber(values.phoneNumber));

                    dispatch(setCountryCode(`+${callingCode}`));



                    try{

                
                
                        
                    signInWithPhoneNumber(formattedNumber);
                   
                
                
                }catch(err){
                    console.error(err);
                }
            } else {
                setFieldError('phoneNumber', 'Please enter a valid phone number');
            }
            setSubmitting(false);
          }}
        >
          {(formikProps: FormikProps<PhoneFormValues>) => (
            <View style={styles.container}>

              <Text style={styles.prompt}>Your phone number</Text>
              <PhoneNumberInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode={"US" as const}
                layout="first"
                onChangeText={(text) => formikProps.setFieldValue('phoneNumber', text)}
                withShadow
                autoFocus
              />
              {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber && (
                <Text style={styles.errorText}>{formikProps.errors.phoneNumber}</Text>
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
    recaptcha:{
        marginTop: 10,
        height:100,
        width:'100%'
    },
    container: {
      flex: 1,
      backgroundColor: 'black', 
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    prompt: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#DAA520',
      marginBottom: 20,
    },
    input: {
      fontSize: 22,
      color: 'white',
      borderBottomColor: '#DAA520',
      borderBottomWidth: 2,
      marginVertical: 10,
      width: '100%',
      paddingVertical: 10,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 14,
      color: 'red',
      marginTop: 5,
    },
    continueButton: {
      backgroundColor: '#DAA520',
      borderRadius: 30,
      marginTop: 20,
      paddingVertical: 15,
      paddingHorizontal: 60,
      width: '100%',
      alignItems: 'center',
    },
    continueButtonText: {
      fontSize: 18,
      color: 'white',
    },
    infoText: {
      fontSize: 14,
      color: 'grey',
      marginTop: 10,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 10,
      padding: 10,
    },
    backIcon: {
      width: 24,
      height: 24,
      tintColor: 'white',
    },
  });