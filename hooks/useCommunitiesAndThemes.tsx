import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Ensure this points to your Firebase setup

interface Community {
  name: string;
}

interface DateTheme {
  name: string;
}

export const useCommunitiesAndThemes = () => {
  const [communitiesList, setCommunitiesList] = useState<Community[]>([]);
  const [dateThemesList, setDateThemesList] = useState<DateTheme[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const communitiesSnapshot = await getDocs(collection(db, "communities"));
      const communities = communitiesSnapshot.docs.map((doc) => ({
        name: doc.data().name,
      }));
      setCommunitiesList(communities);

      const dateThemesSnapshot = await getDocs(
        collection(db, "first_date_preference")
      );
      const dateThemes = dateThemesSnapshot.docs.map((doc) => ({
        name: doc.data().name,
      }));
      setDateThemesList(dateThemes);
    };

    fetchData();
  }, []);

  return { communitiesList, dateThemesList };
};
