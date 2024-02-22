import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { LandingPageProps, RootState } from '../../redux/interfaces';



const LandingPage: React.FC<LandingPageProps> = ({ name, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, {name}!</Text>
      <Text style={styles.registrationComplete}>Your registration is complete!</Text>
      <Text style={styles.createProfilePrompt}>
        Now you can create your profile, after which you can immediately start matching
      </Text>
      <TouchableOpacity style={styles.createProfileButton} onPress={() => navigation.navigate('Rules')}>
        <Text style={styles.createProfileButtonText}>Create your profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
    name: state.nameState.name,
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#DAA520',
      marginBottom: 20,
    },
    registrationComplete: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 10,
    },
    createProfilePrompt: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 30,
    },
    createProfileButton: {
      backgroundColor: '#DAA520',
      padding: 15,
      borderRadius: 25,
    },
    createProfileButtonText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    }
  });



export default connect(mapStateToProps)(LandingPage);