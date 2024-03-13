import { LocationState } from "./reducers/locationReducer";

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
  ageState: AgeState;
  heightState: HeightState;
  locationState: LocationState;
  communitiesState: CommunityState;
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

export interface GenderFormValues {
  gender: string;
}

export interface HeightFormValues {
  height: number;
}

export interface AgeFormValues {
  age: number;
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

export interface AgeState {
  age: number;
}

  export interface HeightState {
    height: number;
  }


  export interface Community {
    id: string;
    name: string;
  }

  export interface CommunityState {
    communities: Array<Community>;
    userSelections: Array<string>;
  }
