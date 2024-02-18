import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, toggleSubscription } from '../../redux/actions';
import { CheckBox } from 'react-native-elements';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { RootState, EmailFormValues } from '../../redux/interfaces';  
import BackHeader from '../../components/BackHeader'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required')
    .max(255, 'Email must be at most 255 characters')
    .matches(

      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
    subscribed: Yup.boolean(),
  });

  export default function Email({ navigation }: { navigation: any }) {
    const { email, subscribed } = useSelector((state: RootState) => state.emailState);
    const dispatch = useDispatch();


  return (
    <>
    <BackHeader />
    <Formik
      initialValues={{ email, subscribed }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
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
        <View style={styles.container}>
          <Text style={styles.header}>Your email address</Text>
          <Text style={styles.subheader}>Don't lose access to your account. Verify your email address</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
          <CheckBox
            title="Send me Sunset Matches updates. You can unsubscribe at any point"
            checked={values.subscribed}
            onPress={() => setFieldValue('subscribed', !values.subscribed)}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxLabel}
            checkedColor='#DAA520'
            uncheckedColor='white'
          />
          <TouchableOpacity onPress={handleSubmit as any} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  error: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    color: 'grey',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxLabel: {
    color: 'white',
    fontWeight: 'normal',
  },
  continueButton: {
    backgroundColor: '#DAA520', 
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});