import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store'; // Make sure the path is correct
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
    <Navigation/>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
