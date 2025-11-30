import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { OnboardingProgress } from '../../components/OnboardingProgress';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingTreatment'>;
};

const OnboardingTreatmentScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress percentage={65} />
      <View style={styles.content}>
        <Text style={styles.title}>Are you currently receiving treatment?</Text>
        <Text style={styles.description}>
          Let us know if you're using any treatments for perimenopause symptoms.
        </Text>

        <Button
          onPress={() => navigation.navigate('OnboardingTreatmentDetails')}
          style={styles.button}
        >
          Yes
        </Button>

        <Button
          variant="outline"
          onPress={() => navigation.navigate('OnboardingHealthIntro')}
          style={styles.button}
        >
          No
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

export default OnboardingTreatmentScreen;
