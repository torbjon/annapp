import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { OnboardingProgress } from '../../components/OnboardingProgress';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingExplainerLong'>;
};

const OnboardingExplainerLongScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={20} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>How anna works</Text>
          <Text style={styles.description}>
            Anna uses AI to understand your unique patterns and provide personalized guidance for your perimenopause journey.
          </Text>
          <Text style={styles.description}>
            The more data you share, the more accurate and helpful your insights become.
          </Text>

          <Button
            onPress={() => navigation.navigate('OnboardingBirthDate')}
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
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  button: {
    width: '100%',
    marginTop: spacing.xl,
  },
});

export default OnboardingExplainerLongScreen;
