import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingFinish'>;
};

const OnboardingFinishScreen: React.FC<Props> = ({ navigation }) => {
  const handleFinish = () => {
    // Navigate to main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color={colors.annaGold} />
        </View>

        <Text style={styles.title}>You're all set!</Text>

        <Text style={styles.description}>
          <Text style={styles.annaHighlight}>anna</Text> is now ready to help you navigate your perimenopause journey with personalized insights and support.
        </Text>

        <Button onPress={handleFinish} style={styles.button}>
          Let's get started
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSize.base,
    lineHeight: 24,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    maxWidth: 320,
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

export default OnboardingFinishScreen;
