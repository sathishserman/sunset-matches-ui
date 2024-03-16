import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCommunities,
  setCommunities2,
  updateUserSelections,
} from "../../redux/actions";
import { RootState } from "../../redux/interfaces";
import BackHeader from "../../components/BackHeader";
import { db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import auth from "@react-native-firebase/auth";

const updateUserRecord = async (uid: any, userSelections: any) => {
  const userRef = doc(db, "user", uid);
  try {
    setDoc(userRef, { communities: userSelections }, { merge: true });
    console.log("User record created or updated successfully");
  } catch (error) {
    console.error("Error creating or updating user record:", error);
  }
};

export default function Communities({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { communities, userSelections } = useSelector(
    (state: RootState) => state.communitiesState2
  );
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  useEffect(() => {
    loadCommunities().then((communities) => {
      dispatch(setCommunities2(communities));
    });
  }, [dispatch]);

  const handleSelect = (communityId: string) => {
    if (selectedCommunities.includes(communityId)) {
      setSelectedCommunities(
        selectedCommunities.filter((id) => id !== communityId)
      );
    } else if (selectedCommunities.length < 7) {
      setSelectedCommunities([...selectedCommunities, communityId]);
    }
  };

  const handleContinue = () => {
    const uid: any = auth().currentUser?.uid;
    updateUserRecord(uid, selectedCommunities);
    dispatch(updateUserSelections(selectedCommunities));
    navigation.navigate("NextScreen");
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item.id)}
      style={styles.communityButton}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.communityImage} />
      {selectedCommunities.includes(item.id) && (
        <View style={styles.selectedOverlay} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackHeader color="white" />
      <Text style={styles.header}>Choose your communities</Text>
      <Text style={styles.subheader}>Max. x7</Text>
      <FlatList
        data={communities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    color: "#fff",
  },
  subheader: {
    fontSize: 18,
    color: "#fff",
  },
  communityButton: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  communityImage: {
    width: "100%",
    height: "100%",
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  continueButton: {
    // styles for the button
  },
  continueButtonText: {},
});
