import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "../screens/Registration/Login";
// import Signup from "../screens/Signup";
// import Forgot from "../screens/Forgot";
import SunsetMatchesMain from "../screens/Registration/SunsetMatchesMain";
import LoginLanding from "../screens/Registration/LoginLanding";
import Email from "../screens/Registration/Email";
import Name from "../screens/Registration/Name";
import Phone from "../screens/Registration/Phone";
import Verification from "../screens/Registration/Verification";
import LandingPage from "../screens/Registration/LandingPage";
import SignUp from "../screens/Registration/SignUp";

const Stack = createNativeStackNavigator();

export const InitialScreenOnStart = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="SunsetMatchesMain"
        component={SunsetMatchesMain}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginLanding"
        component={LoginLanding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Name"
        component={Name}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};
