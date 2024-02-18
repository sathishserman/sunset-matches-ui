import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackHeader from '../../components/BackHeader'; 

export default function LoginLanding({ navigation }: { navigation: any }) {
  const handleLogin = () => {
    navigation.navigate('Phone', {
      flow: 'loginFlow'
    });
  };

  const handleSignUp = () => {
    navigation.navigate('Phone',{
      flow: 'signupFlow'
    });
  };

  const handleHelpdesk = () => {
  };

  return (
    <>
    <BackHeader />
    <View style={styles.container}>
      <Text style={styles.title}>Sunset Matches</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text onPress={handleHelpdesk} style={styles.helpdeskText}>
        Helpdesk
      </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 120, 
  },
  loginButton: {
    borderColor: '#DAA520', 
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20, 
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#DAA520', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 120,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  helpdeskText: {
    color: 'white',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});