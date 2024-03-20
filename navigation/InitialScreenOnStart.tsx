import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Screens from "@/screens/OnBoardingScreens";

const Stack = createNativeStackNavigator();

const screens = [
  { name: "SunsetMatchesMain", component: Screens.SunsetMatchesMain },
  { name: "Email", component: Screens.Email },
  { name: "LandingPage", component: Screens.LandingPage },
  { name: "LoginLanding", component: Screens.LoginLanding },
  { name: "Name", component: Screens.Name },
  { name: "Phone", component: Screens.Phone },
  { name: "SignUp", component: Screens.SignUp },
  { name: "Verification", component: Screens.Verification },
  { name: "BeginOnboarding", component: Screens.BeginOnboarding },
  { name: "ProfileComplete", component: Screens.ProfileComplete },
  { name: "Communities", component: Screens.Communities },
  { name: "DateLocation", component: Screens.DateLocation },
  { name: "DateTheme", component: Screens.DateTheme },
  { name: "FoodPreference", component: Screens.FoodPreference },
  { name: "OnboardingStep0", component: Screens.OnboardingStep0 },
  { name: "OnboardingStep1", component: Screens.OnboardingStep1 },
  { name: "OnboardingStep2", component: Screens.OnboardingStep2 },
  { name: "OnboardingStep2b", component: Screens.OnboardingStep2b },
  { name: "OnboardingStep3", component: Screens.OnboardingStep3 },
  { name: "OnboardingSteps", component: Screens.OnboardingSteps },
  { name: "Age", component: Screens.Age },
  { name: "Gender", component: Screens.Gender },
  { name: "Height", component: Screens.Height },
  { name: "LocationScreen", component: Screens.LocationScreen },
  { name: "Rules", component: Screens.Rules },
  { name: "Bio", component: Screens.Bio },
  { name: "ProfilePic", component: Screens.ProfilePic },
  { name: "AddImage", component: Screens.AddImage },
];

const commonOptions = {
  headerShown: false,
  animationTypeForReplace: "push",
  animation: "slide_from_right",
};

export const InitialScreenOnStart = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      {screens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={commonOptions}
        />
      ))}
    </Stack.Navigator>
  );
};
