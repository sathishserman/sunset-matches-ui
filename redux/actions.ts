import { SET_COMMUNITIES, SET_USER_SELECTIONS, SET_LOCATION, SET_HEIGHT, SET_AGE,SET_GENDER, CONFIRM_RULES, SET_NAME , SET_EMAIL, TOGGLE_SUBSCRIPTION, SET_PHONE_NUMBER, SET_VERIFICATION_CODE, SET_COUNTRY_CODE} from './actionTypes';
import { Dispatch } from 'redux';
import { collection, getDocs } from "firebase/firestore";
import {db } from '../firebase/firebase';
import { doc , setDoc} from "firebase/firestore";
import {Community} from "./interfaces";

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

export const confirmRules = () => ({
  type: CONFIRM_RULES,
});

export const setGender = (gender: string) => ({
  type: SET_GENDER,
  payload: gender,
});

export const setAge = (age: number) => ({
  type: SET_AGE,
  payload: age,
});

export const setHeight = (height: number) => {
  return {
    type: SET_HEIGHT,
    payload: height,
  };
};


export const setLocation = (latitude: number, longitude: number) => ({
  type: SET_LOCATION,
  payload: { latitude, longitude },
});

export const loadCommunities = async () => {
  const querySnapshot = await getDocs(collection(db, "community"));
  const communities = querySnapshot.forEach((doc) => ({ id: doc.id, ...doc.data() }));
  return communities;
};

export const setCommunities = (communities:any) => ({
    type: SET_COMMUNITIES,
    payload: communities,
});


export const updateUserSelections = (selections:any) => ({
  type: SET_USER_SELECTIONS,
  payload: selections,
});