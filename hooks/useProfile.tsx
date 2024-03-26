import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Ensure this points to your Firebase setup
import auth from "@react-native-firebase/auth";

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

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        setIsLoading(false);
        return;
      }
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(userSnap.data() as UserProfile);
      } else {
        console.log("No such document!");
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  return { profile, isLoading };
};
