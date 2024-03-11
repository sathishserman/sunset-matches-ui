import React, { createContext, useState, useContext, ReactNode, FunctionComponent, useEffect } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


interface AuthContextType {
  user: FirebaseAuthTypes.User | null; 
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  confirmationResult: FirebaseAuthTypes.ConfirmationResult | null;
  setConfirmationResult: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.ConfirmationResult | null>>;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserDocument {
  email: string; 
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [initializing, setInitializing] = useState(true);

  async function fetchUsers() {
    try {
      const usersSnapshot = await firestore().collection('users').get();
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      console.log('Fetched users:', usersList);
      return usersList; 
    } catch (error) {
      console.error('Error fetching users from Firestore:', error);
      return [];
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {

       
        //console.log(user);
        const userData: UserDocument = {
          email: user.email || '',
        };
        //firestore().collection('user').doc(user.uid).set(userData, { merge: true });

        // firestore()
        // .collection('user')
        // .doc('user_id')
        // .get()
        // .then(documentSnapshot => {
        //   if (documentSnapshot.exists) {
        //     console.log('Document data:', documentSnapshot.data());
        //   } else {
        //     console.log('No such document!');
        //   }
        // })
        // .catch(error => {
        //   console.error('Error getting document:', error);
        // });

        //fetchUsers();

        // userDocument.update({
        //   email: 'Some New Value'
        // }).then(() => {
        //   console.log('Document successfully updated!');
        // }).catch((error) => {
        //   console.error('Error updating document:', error);
        // });

       // console.log(userDocument);

      }     
      setUser(user);
      if (initializing) setInitializing(false);
    });


    return subscriber;
  }, []);

  const value = {
    user,
    setUser,
    confirmationResult,
    setConfirmationResult,
    initializing
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};