import Email from "@/screens/Registration/Email";
import LandingPage from "@/screens/Registration/LandingPage";
import LoginLanding from "@/screens/Registration/LoginLanding";
import Name from "@/screens/Registration/Name";
import Phone from "@/screens/Registration/Phone";
import SignUp from "@/screens/Registration/SignUp";
import SunsetMatchesMain from "@/screens/Registration/SunsetMatchesMain";
import Verification from "@/screens/Registration/Verification";
import BeginOnboarding from "@/screens/onboarding/BeginOnboarding";
import ProfileComplete from "@/screens/onboarding/ProfileComplete";
import Communities from "@/screens/onboarding/preferences/Communities";
import DateLocation from "@/screens/onboarding/preferences/DateLocation";
import DateTheme from "@/screens/onboarding/preferences/DateTheme";
import FoodPreference from "@/screens/onboarding/preferences/FoodPreferences";
import OnboardingStep0 from "@/screens/onboarding/steps/OnboardingStep0";
import OnboardingStep1 from "@/screens/onboarding/steps/OnboardingStep1";
import OnboardingStep2 from "@/screens/onboarding/steps/OnboardingStep2";
import OnboardingStep2b from "@/screens/onboarding/steps/OnboardingStep2b";
import OnboardingStep3 from "@/screens/onboarding/steps/OnboardingStep3";
import OnboardingSteps from "@/screens/onboarding/steps/OnboardingSteps";
import Age from "@/screens/profile/Age";
import Gender from "@/screens/profile/Gender";
import Height from "@/screens/profile/Height";
import LocationScreen from "@/screens/profile/Location";
import Rules from "@/screens/profile/Rules";
import Bio from "@/screens/profile/customize/Bio";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
        name="LocationScreen"
        component={LocationScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="DateLocation"
        component={DateLocation}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Communities"
        component={Communities}
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
        name="OnboardingStep1"
        component={OnboardingStep1}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="OnboardingStep2"
        component={OnboardingStep2}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="OnboardingStep2b"
        component={OnboardingStep2b}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="OnboardingStep3"
        component={OnboardingStep3}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Communties"
        component={Communities}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="DateTheme"
        component={DateTheme}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="FoodPreference"
        component={FoodPreference}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Bio"
        component={Bio}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};
