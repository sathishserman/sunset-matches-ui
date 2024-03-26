import "expo-dev-client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AuthProvider } from "@/context/AuthContext";
import AuthenticatedApp from "@/AuthenticatedApp"; // Import the component you just created
import { expo as expoApp } from "@/app.json";
import { AppRegistry } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthenticatedApp />
          <Toast />
        </GestureHandlerRootView>
      </AuthProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(expoApp.name, () => App);
