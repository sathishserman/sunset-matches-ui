import {collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase/firebase";

interface Venue {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  description: string;
  imageURLs: string[];
  type: string;
}

interface UserDetail {
  email: string;
  phone: string;
}

const fetchUserDetails = async (userId: string): Promise<UserDetail> => {
  const userRef = doc(db, 'user', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('User not found');
  }

  const userData = userSnap.data();
  return { email: userData.email, phone: userData.phoneNumber };
};


export const proposeMatchVenue = async (userIds: string[], venue: Venue): Promise<string> => {
  if (userIds.length !== 2) {
    throw new Error('Exactly two user IDs must be provided.');
  }

  const userDetails = await Promise.all(userIds.map(userId => fetchUserDetails(userId)));

  const matchRef = await addDoc(collection(db, 'matches'), {
    userIds,
    user1Email: userDetails[0].email,
    user1Phone: userDetails[0].phone,
    user2Email: userDetails[1].email,
    user2Phone: userDetails[1].phone,
    venueName: venue.name,
    timestamp: Timestamp.now(),
    status: 'pending'
  });

  console.log(`Match proposed with ID: ${matchRef.id}, Venue Name: ${venue.name}`);
  return matchRef.id;
};