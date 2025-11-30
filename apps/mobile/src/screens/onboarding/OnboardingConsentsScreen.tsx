import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, useToast } from "../../components/ui";
import { Checkbox } from "../../components/ui/Checkbox";
import { OnboardingProgress } from "../../components/OnboardingProgress";
import { colors, fontSize, fontWeight, spacing } from "../../lib/theme";
import { RootStackParamList } from "../../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "OnboardingConsents"
  >;
};

const OnboardingConsentsScreen: React.FC<Props> = ({ navigation }) => {
  const { toast } = useToast();
  const [consents, setConsents] = useState({
    privacy: false,
    terms: false,
    marketing: false,
    analytics: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAcceptAll = () => {
    setConsents({
      privacy: true,
      terms: true,
      marketing: true,
      analytics: true,
    });
    toast.success("Preferences saved");
    navigation.navigate("OnboardingName");
  };

  const handleContinue = () => {
    if (!consents.privacy || !consents.terms) {
      toast.error("Please accept the required privacy policy and terms of use");
      return;
    }

    setIsSubmitting(true);
    toast.success("Preferences saved");
    navigation.navigate("OnboardingName");
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={5} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>We respect your privacy</Text>

          <Text style={styles.description}>
            <Text style={styles.annaHighlight}>anna</Text> uses your data to
            give you personalised, day-ahead support, not generic advice. Please
            review how we can use your information. Some choices are needed for
            the app to work; others are optional and you can change them anytime
            in Settings.
          </Text>

          <TouchableOpacity onPress={handleAcceptAll}>
            <Text style={styles.acceptAll}>Accept all</Text>
          </TouchableOpacity>

          <View style={styles.checkboxes}>
            <View style={styles.checkboxRow}>
              <Checkbox
                checked={consents.privacy}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, privacy: checked })
                }
              />
              <Text style={styles.checkboxLabel}>
                I agree that anna may process my personal and health data to
                provide app functions and personalised insights, as described in
                the <Text style={styles.underline}>Privacy Policy.</Text>
              </Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                checked={consents.terms}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, terms: checked })
                }
              />
              <Text style={styles.checkboxLabel}>
                I have read and agree to anna's{" "}
                <Text style={styles.underline}>Privacy Policy</Text> and{" "}
                <Text style={styles.underline}>Terms of Use</Text>.
              </Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                checked={consents.marketing}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, marketing: checked })
                }
              />
              <Text style={styles.checkboxLabel}>
                I agree that Anna may send me wellbeing tips, product updates
                and occasional offers by email or in-app. I can opt out anytime.
              </Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                checked={consents.analytics}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, analytics: checked })
                }
              />
              <Text style={styles.checkboxLabel}>
                I agree that Anna may use my app-usage data and share it with
                analytics partners to improve the app.
              </Text>
            </View>
          </View>

          <Button
            onPress={handleContinue}
            disabled={isSubmitting || !consents.privacy || !consents.terms}
            loading={isSubmitting}
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
    paddingTop: 100, // Space for progress bar
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    lineHeight: 31.2,
    marginBottom: 9,
    maxWidth: 339,
  },
  description: {
    fontSize: fontSize.base,
    lineHeight: 20,
    color: colors.foreground,
    marginBottom: 27,
  },
  annaHighlight: {
    color: colors.annaGold,
    fontWeight: fontWeight.bold,
  },
  acceptAll: {
    color: colors.annaGold,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.base,
    lineHeight: 20,
    marginBottom: 37,
  },
  checkboxes: {
    gap: 24,
    marginBottom: 84,
  },
  checkboxRow: {
    flexDirection: "row",
    gap: 12,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: 24,
    color: colors.foreground,
  },
  underline: {
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    maxWidth: 327,
  },
});

export default OnboardingConsentsScreen;
