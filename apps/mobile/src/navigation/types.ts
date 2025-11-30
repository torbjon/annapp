export type RootStackParamList = {
  // Auth screens
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  EmailSignIn: undefined;
  EmailSignUp: undefined;
  AuthCallback: undefined;

  // Onboarding screens
  OnboardingExplainer: undefined;
  OnboardingConsents: undefined;
  OnboardingName: undefined;
  OnboardingConnect: undefined;
  OnboardingExplainerLong: undefined;
  OnboardingBirthDate: undefined;
  OnboardingStage: undefined;
  OnboardingPeriodTracking: undefined;
  OnboardingJourney: undefined;
  OnboardingKnowledge: undefined;
  OnboardingSymptomAssessment: undefined;
  OnboardingSymptomDetails: undefined;
  OnboardingPhysician: undefined;
  OnboardingTreatment: undefined;
  OnboardingTreatmentDetails: undefined;
  OnboardingHealthIntro: undefined;
  OnboardingHealthConditions: undefined;
  OnboardingPhysicalMetricsIntro: undefined;
  OnboardingPhysicalMetrics: undefined;
  OnboardingActivityLevel: undefined;
  OnboardingExerciseFrequency: undefined;
  OnboardingExerciseIntensity: undefined;
  OnboardingFinish: undefined;

  // Main app screens (tabs)
  MainTabs: undefined;
  Home: undefined;
  Insights: undefined;
  Calendar: undefined;
  Vault: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Insights: undefined;
  Calendar: undefined;
  Vault: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
