import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Ensure this points to your Firebase setup

interface UserProfile {
  age: string;
  bio: string;
  communities: string[];
  dateThemes: string[];
  email: string;
  foodPreference: string;
  gender: string;
  height: string;
  name: string;
  phone: string;
  pics: string[];
  subscription: boolean;
}

export const updateProfile = async (
  userId: string,
  attribute: keyof UserProfile,
  newValue: any
) => {
  const userRef = doc(db, "user", userId);
  await updateDoc(userRef, { [attribute]: newValue });
};
