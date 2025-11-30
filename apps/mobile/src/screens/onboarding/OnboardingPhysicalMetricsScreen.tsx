import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { OnboardingProgress } from '../../components/OnboardingProgress';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingPhysicalMetrics'>;
};

const OnboardingPhysicalMetricsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={90} />
      <View style={styles.content}>
        <Text style={styles.title}>Your measurements</Text>
        <Text style={styles.description}>
          Enter your height and weight (optional but helpful for personalized insights).
        </Text>

        <Button
          onPress={() => navigation.navigate('OnboardingActivityLevel')}
          style={styles.button}
        >
          Continue
        </Button>

        <Button
          variant="ghost"
          onPress={() => navigation.navigate('OnboardingActivityLevel')}
          style={styles.skipButton}
        >
          Skip
        </Button>
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
    paddingHorizontal: spacing.lg,
    paddingTop: 130,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
  button: {
    width: '100%',
    marginBottom: spacing.md,
  },
  skipButton: {
    width: '100%',
  },
});

export default OnboardingPhysicalMetricsScreen;
