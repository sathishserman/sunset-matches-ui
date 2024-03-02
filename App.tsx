import "expo-dev-client";
import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import {expo as expoApp} from './app.json';
import {AppRegistry} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(expoApp.name, () => App);
