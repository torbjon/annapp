import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { OnboardingProgress } from '../../components/OnboardingProgress';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingSymptomAssessment'>;
};

const OnboardingSymptomAssessmentScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={50} />
      <View style={styles.content}>
        <Text style={styles.title}>Let's understand your symptoms</Text>
        <Text style={styles.description}>
          Help us understand what you're experiencing so we can provide better support.
        </Text>

        <Button
          onPress={() => navigation.navigate('OnboardingSymptomDetails')}
          style={styles.button}
        >
          Continue
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
  },
});

export default OnboardingSymptomAssessmentScreen;
