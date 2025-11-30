import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Button, useToast } from "../../components/ui";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../../lib/theme";
import { RootStackParamList } from "../../navigation/types";

type SignInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SignIn">;
};

// Google Icon Component
const GoogleIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={{ fontSize: 20 }}>G</Text>
  </View>
);

// Apple Icon Component
const AppleIcon = () => (
  <Ionicons name="logo-apple" size={20} color={colors.foreground} />
);

// Mail Icon Component
const MailIcon = () => (
  <Ionicons name="mail-outline" size={20} color={colors.foreground} />
);

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    toast.info("Google sign-in coming soon");
  };

  const handleAppleSignIn = async () => {
    toast.info("Apple sign-in coming soon");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign in</Text>

          <View style={styles.buttonGroup}>
            <Button
              variant="outline"
              onPress={handleGoogleSignIn}
              icon={<GoogleIcon />}
              style={styles.authButton}
            >
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onPress={handleAppleSignIn}
              icon={<AppleIcon />}
              style={styles.authButton}
            >
              Continue with Apple
            </Button>

            <Button
              variant="outline"
              onPress={() => navigation.navigate("EmailSignIn")}
              icon={<MailIcon />}
              style={styles.authButton}
            >
              Continue with Email
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  card: {
    width: "100%",
    maxWidth: 393,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    textAlign: "center",
  },
  buttonGroup: {
    gap: spacing.md,
  },
  authButton: {
    width: "100%",
    height: 54,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  linkText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
