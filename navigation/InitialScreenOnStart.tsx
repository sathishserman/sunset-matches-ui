import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SunsetMatchesMain from "../screens/Registration/SunsetMatchesMain";
import LoginLanding from "../screens/Registration/LoginLanding";
import Email from "../screens/Registration/Email";
import Name from "../screens/Registration/Name";
import Phone from "../screens/Registration/Phone";
import Verification from "../screens/Registration/Verification";
import LandingPage from "../screens/Registration/LandingPage";
import SignUp from "../screens/Registration/SignUp";
import Rules from "../screens/profile/Rules";
import Gender from "../screens/profile/Gender";
import Age from "../screens/profile/Age";
import Height from "../screens/profile/Height";
import ProfileComplete from "../screens/onboarding/ProfileComplete";
import BeginOnboarding from "../screens/onboarding/BeginOnboarding";
import OnboardingSteps from "../screens/onboarding/OnboardingSteps";
import OnboardingStep0 from "../screens/onboarding/OnboardingStep0";
import LocationScreen from "../screens/profile/Location";

const Stack = createNativeStackNavigator();

export const InitialScreenOnStart = ({ navigation }: { navigation: any }) => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="SunsetMatchesMain"
        component={SunsetMatchesMain}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="LoginLanding"
        component={LoginLanding}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Name"
        component={Name}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Age"
        component={Age}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Height"
        component={Height}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ProfileComplete"
        component={ProfileComplete}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="BeginOnboarding"
        component={BeginOnboarding}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="OnboardingSteps"
        component={OnboardingSteps}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="OnboardingStep0"
        component={OnboardingStep0}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};
