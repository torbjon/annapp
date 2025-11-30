import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, fontSize } from '../../lib/theme';

interface ProgressProps {
  value: number;
  showLabel?: boolean;
  style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  showLabel = true,
  style,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={styles.label}>{clampedValue}%</Text>
      )}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedValue}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  track: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
});

export default Progress;
