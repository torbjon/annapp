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
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "OnboardingKnowledge"
  >;
};

const options = [
  { value: "none", label: "I know very little" },
  { value: "some", label: "I know the basics" },
  { value: "good", label: "I have a good understanding" },
  { value: "expert", label: "I consider myself well-informed" },
];

const OnboardingKnowledgeScreen: React.FC<Props> = ({ navigation }) => {
  const { toast } = useToast();
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!selected) {
      toast.error("Please select an option");
      return;
    }

    setIsLoading(true);
    navigation.navigate("OnboardingSymptomAssessment");
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={45} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            How much do you know about perimenopause?
          </Text>

          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            options={options}
            style={styles.radioGroup}
          />

          <Button
            onPress={handleContinue}
            disabled={isLoading || !selected}
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.xl,
  },
  radioGroup: {
    marginBottom: spacing.xl,
  },
  button: {
    width: "100%",
  },
});

export default OnboardingKnowledgeScreen;
