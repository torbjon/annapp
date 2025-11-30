import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input, useToast } from "../../components/ui";
import { OnboardingProgress } from "../../components/OnboardingProgress";
import { colors, fontSize, fontWeight } from "../../lib/theme";
import { RootStackParamList } from "../../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OnboardingName">;
};

const OnboardingNameScreen: React.FC<Props> = ({ navigation }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    toast.success("Name saved");
    navigation.navigate("OnboardingConnect");
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={10} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            What would you like <Text style={styles.annaHighlight}>anna</Text>{" "}
            to call you?
          </Text>

          <Input
            label="First name / nickname"
            value={name}
            onChangeText={setName}
            containerStyle={styles.inputContainer}
            autoCapitalize="words"
            autoComplete="given-name"
          />

          <Button
            onPress={handleContinue}
            disabled={isSubmitting || !name.trim()}
            loading={isSubmitting}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    lineHeight: 31.2,
    marginBottom: 37,
    maxWidth: 339,
  },
  annaHighlight: {
    color: colors.annaYellow,
  },
  inputContainer: {
    marginBottom: 85,
    maxWidth: 353,
  },
  button: {
    width: "100%",
    maxWidth: 327,
  },
});

export default OnboardingNameScreen;
