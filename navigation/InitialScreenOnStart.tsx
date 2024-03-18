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
  const mainOptions = {
    headerShown: false,
    animationTypeForReplace: "push",
    animation: "slide_from_right",
  };

  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="SunsetMatchesMain"
        component={SunsetMatchesMain}
        options={mainOptions}
      />
      <Stack.Screen
        name="LoginLanding"
        component={LoginLanding}
        options={mainOptions}
      />
      <Stack.Screen name="Phone" component={Phone} options={mainOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={mainOptions} />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={mainOptions}
      />
      <Stack.Screen name="Email" component={Email} options={mainOptions} />
      <Stack.Screen name="Name" component={Name} options={mainOptions} />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={mainOptions}
      />
      <Stack.Screen name="Rules" component={Rules} options={mainOptions} />
      <Stack.Screen name="Gender" component={Gender} options={mainOptions} />
      <Stack.Screen name="Age" component={Age} options={mainOptions} />
      <Stack.Screen name="Height" component={Height} options={mainOptions} />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={mainOptions}
      />
      <Stack.Screen
        name="DateLocation"
        component={DateLocation}
        options={mainOptions}
      />
      <Stack.Screen
        name="Communities"
        component={Communities}
        options={mainOptions}
      />
      <Stack.Screen
        name="ProfileComplete"
        component={ProfileComplete}
        options={mainOptions}
      />
      <Stack.Screen
        name="BeginOnboarding"
        component={BeginOnboarding}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingSteps"
        component={OnboardingSteps}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingStep0"
        component={OnboardingStep0}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingStep1"
        component={OnboardingStep1}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingStep2"
        component={OnboardingStep2}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingStep2b"
        component={OnboardingStep2b}
        options={mainOptions}
      />
      <Stack.Screen
        name="OnboardingStep3"
        component={OnboardingStep3}
        options={mainOptions}
      />
      <Stack.Screen
        name="Communties"
        component={Communities}
        options={mainOptions}
      />
      <Stack.Screen
        name="DateTheme"
        component={DateTheme}
        options={mainOptions}
      />
      <Stack.Screen
        name="FoodPreference"
        component={FoodPreference}
        options={mainOptions}
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
