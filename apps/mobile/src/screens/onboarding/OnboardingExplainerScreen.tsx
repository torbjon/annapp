import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingExplainer'>;
};

const OnboardingExplainerScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Plan your better days, not just your symptoms
        </Text>

        <Text style={styles.description}>
          <Text style={styles.annaHighlight}>anna</Text> learns from your body, routine and symptoms to give day-ahead tips you can actually use. The more you share now, the smarter your guidance becomes.
        </Text>

        <Button
          onPress={() => navigation.navigate('OnboardingConsents')}
          style={styles.button}
        >
          Let's personalize your app
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
    paddingHorizontal: spacing.xl,
    justifyContent: 'flex-end',
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    lineHeight: 31.2,
    marginBottom: 30,
    maxWidth: 339,
  },
  description: {
    fontSize: fontSize.base,
    lineHeight: 20,
    color: colors.foreground,
    marginBottom: 118,
    maxWidth: 314,
  },
  annaHighlight: {
    color: colors.annaYellow,
    fontWeight: fontWeight.bold,
  },
  button: {
    width: '100%',
    maxWidth: 327,
  },
});

export default OnboardingExplainerScreen;
