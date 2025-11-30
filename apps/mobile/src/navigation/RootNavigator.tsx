import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/ui";
import { colors } from "../lib/theme";
import { RootStackParamList, MainTabParamList } from "./types";

// Auth Screens
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import EmailSignInScreen from "../screens/auth/EmailSignInScreen";
import EmailSignUpScreen from "../screens/auth/EmailSignUpScreen";

// Onboarding Screens
import OnboardingExplainerScreen from "../screens/onboarding/OnboardingExplainerScreen";
import OnboardingConsentsScreen from "../screens/onboarding/OnboardingConsentsScreen";
import OnboardingNameScreen from "../screens/onboarding/OnboardingNameScreen";
import OnboardingConnectScreen from "../screens/onboarding/OnboardingConnectScreen";
import OnboardingExplainerLongScreen from "../screens/onboarding/OnboardingExplainerLongScreen";
import OnboardingBirthDateScreen from "../screens/onboarding/OnboardingBirthDateScreen";
import OnboardingStageScreen from "../screens/onboarding/OnboardingStageScreen";
import OnboardingPeriodTrackingScreen from "../screens/onboarding/OnboardingPeriodTrackingScreen";
import OnboardingJourneyScreen from "../screens/onboarding/OnboardingJourneyScreen";
import OnboardingKnowledgeScreen from "../screens/onboarding/OnboardingKnowledgeScreen";
import OnboardingSymptomAssessmentScreen from "../screens/onboarding/OnboardingSymptomAssessmentScreen";
import OnboardingSymptomDetailsScreen from "../screens/onboarding/OnboardingSymptomDetailsScreen";
import OnboardingPhysicianScreen from "../screens/onboarding/OnboardingPhysicianScreen";
import OnboardingTreatmentScreen from "../screens/onboarding/OnboardingTreatmentScreen";
import OnboardingTreatmentDetailsScreen from "../screens/onboarding/OnboardingTreatmentDetailsScreen";
import OnboardingHealthIntroScreen from "../screens/onboarding/OnboardingHealthIntroScreen";
import OnboardingHealthConditionsScreen from "../screens/onboarding/OnboardingHealthConditionsScreen";
import OnboardingPhysicalMetricsIntroScreen from "../screens/onboarding/OnboardingPhysicalMetricsIntroScreen";
import OnboardingPhysicalMetricsScreen from "../screens/onboarding/OnboardingPhysicalMetricsScreen";
import OnboardingActivityLevelScreen from "../screens/onboarding/OnboardingActivityLevelScreen";
import OnboardingExerciseFrequencyScreen from "../screens/onboarding/OnboardingExerciseFrequencyScreen";
import OnboardingExerciseIntensityScreen from "../screens/onboarding/OnboardingExerciseIntensityScreen";
import OnboardingFinishScreen from "../screens/onboarding/OnboardingFinishScreen";

// Main Screens
import HomeScreen from "../screens/main/HomeScreen";
import InsightsScreen from "../screens/main/InsightsScreen";
import CalendarScreen from "../screens/main/CalendarScreen";
import VaultScreen from "../screens/main/VaultScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Insights":
              iconName = focused ? "analytics" : "analytics-outline";
              break;
            case "Calendar":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Vault":
              iconName = focused ? "folder" : "folder-outline";
              break;
            default:
              iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.annaGold,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.secondary,
          height: 85,
          paddingTop: 8,
          paddingBottom: 25,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Vault" component={VaultScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="EmailSignIn" component={EmailSignInScreen} />
          <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        </>
      ) : (
        // Authenticated Stack
        <>
          <Stack.Screen
            name="OnboardingExplainer"
            component={OnboardingExplainerScreen}
          />
          <Stack.Screen
            name="OnboardingConsents"
            component={OnboardingConsentsScreen}
          />
          <Stack.Screen
            name="OnboardingName"
            component={OnboardingNameScreen}
          />
          <Stack.Screen
            name="OnboardingConnect"
            component={OnboardingConnectScreen}
          />
          <Stack.Screen
            name="OnboardingExplainerLong"
            component={OnboardingExplainerLongScreen}
          />
          <Stack.Screen
            name="OnboardingBirthDate"
            component={OnboardingBirthDateScreen}
          />
          <Stack.Screen
            name="OnboardingStage"
            component={OnboardingStageScreen}
          />
          <Stack.Screen
            name="OnboardingPeriodTracking"
            component={OnboardingPeriodTrackingScreen}
          />
          <Stack.Screen
            name="OnboardingJourney"
            component={OnboardingJourneyScreen}
          />
          <Stack.Screen
            name="OnboardingKnowledge"
            component={OnboardingKnowledgeScreen}
          />
          <Stack.Screen
            name="OnboardingSymptomAssessment"
            component={OnboardingSymptomAssessmentScreen}
          />
          <Stack.Screen
            name="OnboardingSymptomDetails"
            component={OnboardingSymptomDetailsScreen}
          />
          <Stack.Screen
            name="OnboardingPhysician"
            component={OnboardingPhysicianScreen}
          />
          <Stack.Screen
            name="OnboardingTreatment"
            component={OnboardingTreatmentScreen}
          />
          <Stack.Screen
            name="OnboardingTreatmentDetails"
            component={OnboardingTreatmentDetailsScreen}
          />
          <Stack.Screen
            name="OnboardingHealthIntro"
            component={OnboardingHealthIntroScreen}
          />
          <Stack.Screen
            name="OnboardingHealthConditions"
            component={OnboardingHealthConditionsScreen}
          />
          <Stack.Screen
            name="OnboardingPhysicalMetricsIntro"
            component={OnboardingPhysicalMetricsIntroScreen}
          />
          <Stack.Screen
            name="OnboardingPhysicalMetrics"
            component={OnboardingPhysicalMetricsScreen}
          />
          <Stack.Screen
            name="OnboardingActivityLevel"
            component={OnboardingActivityLevelScreen}
          />
          <Stack.Screen
            name="OnboardingExerciseFrequency"
            component={OnboardingExerciseFrequencyScreen}
          />
          <Stack.Screen
            name="OnboardingExerciseIntensity"
            component={OnboardingExerciseIntensityScreen}
          />
          <Stack.Screen
            name="OnboardingFinish"
            component={OnboardingFinishScreen}
          />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
