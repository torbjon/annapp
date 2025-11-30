import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input, useToast } from "../../components/ui";
import { OnboardingProgress } from "../../components/OnboardingProgress";
import { colors, fontSize, fontWeight, spacing } from "../../lib/theme";
import { RootStackParamList } from "../../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "OnboardingBirthDate"
  >;
};

const OnboardingBirthDateScreen: React.FC<Props> = ({ navigation }) => {
  const { toast } = useToast();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    if (!day || !month || !year) {
      toast.error("Please enter your complete birth date");
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validate inputs
    if (dayNum < 1 || dayNum > 31) {
      toast.error("Please enter a valid day (1-31)");
      return;
    }
    if (monthNum < 1 || monthNum > 12) {
      toast.error("Please enter a valid month (1-12)");
      return;
    }
    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      toast.error("Please enter a valid year");
      return;
    }

    setIsSubmitting(true);
    navigation.navigate("OnboardingStage");
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={25} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Your date of birth</Text>

            <View style={styles.inputsContainer}>
              <Input
                label="Day"
                placeholder="15"
                value={day}
                onChangeText={setDay}
                keyboardType="number-pad"
                maxLength={2}
              />

              <Input
                label="Month"
                placeholder="6"
                value={month}
                onChangeText={setMonth}
                keyboardType="number-pad"
                maxLength={2}
              />

              <Input
                label="Birth Year"
                placeholder="1990"
                value={year}
                onChangeText={setYear}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>

            <Text style={styles.description}>
              This helps us understand where you might be in the perimenopause
              journey. We never show your age to anyone.
            </Text>

            <Button
              onPress={handleContinue}
              disabled={isSubmitting || !day || !month || !year}
              loading={isSubmitting}
              style={styles.button}
            >
              Continue
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 130,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    lineHeight: 31.2,
    marginBottom: 44,
    maxWidth: 339,
  },
  inputsContainer: {
    gap: 28,
    marginBottom: 27,
  },
  description: {
    fontSize: fontSize.base,
    lineHeight: 20,
    color: colors.foreground,
    marginBottom: 77,
    maxWidth: 314,
  },
  button: {
    width: "100%",
    maxWidth: 327,
  },
});

export default OnboardingBirthDateScreen;
