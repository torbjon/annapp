import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Progress } from './ui';
import { colors, spacing } from '../lib/theme';

interface OnboardingProgressProps {
  percentage: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ percentage }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <Progress value={percentage} showLabel={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background,
    zIndex: 50,
  },
});

export default OnboardingProgress;
