
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface EmailState {
    email: string;
    subscribed: boolean;
  }

export interface NameState {
    name: string;
  }

  export interface PhoneState {
    phoneNumber: string;
    countryCode: string;
  }

  export interface RootState {
    nameState: NameState;
    emailState: EmailState;
    phoneState: PhoneState;
    verificationState: VerificationState;
    genderState: GenderState;

  }
  
  export interface NameFormValues {
    name: string;
  }

  export interface PhoneFormValues {
    phoneNumber: string;
  }

  export interface EmailFormValues {
    email: string;
    subscribed: boolean;
  }

  export interface VerificationFormValues {
    verificationCode: string;
  }

  export interface VerificationState {
    verificationCode: string;
  }

  export interface LandingPageProps {
    name: string;
    navigation: any;
  }

  export interface ConfirmState {
    rulesConfirmed: boolean;
  }

  export interface GenderState {
    gender: string;
  }

  export type RuleProps = {
    text: string;
};