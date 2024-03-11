import React from 'react';
import Navigation from './navigation/Navigation';
import { useAuth } from './context/AuthContext';

function AuthenticatedApp() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return null; // Need to replace it with loading screen
  }

  return <Navigation />;
}

export default AuthenticatedApp;