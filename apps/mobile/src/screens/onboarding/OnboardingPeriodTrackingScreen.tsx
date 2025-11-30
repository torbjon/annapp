import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { OnboardingProgress } from '../../components/OnboardingProgress';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingPeriodTracking'>;
};

const OnboardingPeriodTrackingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={35} />
      <View style={styles.content}>
        <Text style={styles.title}>Period tracking</Text>
        <Text style={styles.description}>
          Would you like to track your periods? This helps anna understand your cycle patterns.
        </Text>

        <Button
          onPress={() => navigation.navigate('OnboardingJourney')}
          style={styles.button}
        >
          Yes, track my periods
        </Button>

        <Button
          variant="outline"
          onPress={() => navigation.navigate('OnboardingJourney')}
          style={styles.button}
        >
          No, skip this
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
});

export default OnboardingPeriodTrackingScreen;
