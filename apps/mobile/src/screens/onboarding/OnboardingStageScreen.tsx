import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, useToast } from "../../components/ui";
import { RadioGroup } from "../../components/ui/RadioGroup";
import { OnboardingProgress } from "../../components/OnboardingProgress";
import { colors, fontSize, fontWeight, spacing } from "../../lib/theme";
import { RootStackParamList } from "../../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OnboardingStage">;
};

const stages = [
  { value: "regular_periods", label: "I have regular periods" },
  {
    value: "changing_periods",
    label: "My periods are changing (timing, flow, symptoms)",
  },
  {
    value: "no_period_12months",
    label: "I haven't had a period for 12+ months",
  },
  { value: "no_uterus", label: "I don't have a uterus / don't menstruate" },
  { value: "not_sure", label: "Not sure" },
];

const OnboardingStageScreen: React.FC<Props> = ({ navigation }) => {
  const { toast } = useToast();
  const [selectedStage, setSelectedStage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedStage) {
      toast.error("Please select an option");
      return;
    }

    setIsLoading(true);
    toast.success("Profile updated!");

    // Conditional routing based on selection
    if (
      selectedStage === "regular_periods" ||
      selectedStage === "changing_periods" ||
      selectedStage === "not_sure"
    ) {
      navigation.navigate("OnboardingPeriodTracking");
    } else {
      navigation.navigate("OnboardingJourney");
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={30} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Where are you right now?</Text>

          <Text style={styles.description}>
            Choose the option that feels closest. This helps us understand where
            you are in your journey
          </Text>

          <RadioGroup
            value={selectedStage}
            onValueChange={setSelectedStage}
            options={stages}
            style={styles.radioGroup}
          />

          <Button
            onPress={handleContinue}
            disabled={isLoading || !selectedStage}
            loading={isLoading}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 130,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: 8,
  },
  description: {
    fontSize: fontSize.base,
    color: colors.foreground,
    marginBottom: 32,
  },
  radioGroup: {
    marginBottom: 48,
  },
  button: {
    width: "100%",
  },
});

export default OnboardingStageScreen;
