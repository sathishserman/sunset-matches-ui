import { SET_NAME , SET_EMAIL, TOGGLE_SUBSCRIPTION, SET_PHONE_NUMBER, SET_VERIFICATION_CODE, SET_COUNTRY_CODE} from './actionTypes';



export const setEmail = (email: string) => ({
  type: SET_EMAIL  as typeof SET_EMAIL,
  payload: email,
});

export const toggleSubscription = (subscribed: boolean) => ({
  type: TOGGLE_SUBSCRIPTION  as typeof TOGGLE_SUBSCRIPTION,
  payload: subscribed
});

export const setName = (name: string) => ({
  type: SET_NAME as typeof SET_NAME,
  payload: name,
});

export const setPhoneNumber = (phoneNumber: string) => ({
  type: SET_PHONE_NUMBER,
  payload: phoneNumber,
});

export const setVerificationCode = (code: string) => ({
  type: SET_VERIFICATION_CODE as typeof SET_VERIFICATION_CODE,
  payload: code,
});


export const setCountryCode = (countryCode: string) => ({
  type: SET_COUNTRY_CODE,
  payload: countryCode,
});