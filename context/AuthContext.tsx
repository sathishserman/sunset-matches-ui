import React, { createContext, useState, useContext, ReactNode, FunctionComponent } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null; // Adjust according to the type of user object you have
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  confirmationResult: FirebaseAuthTypes.ConfirmationResult | null;
  setConfirmationResult: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.ConfirmationResult | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const value = {
    user,
    setUser,
    confirmationResult,
    setConfirmationResult,
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