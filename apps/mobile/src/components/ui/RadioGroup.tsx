import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, fontSize, fontWeight, spacing } from '../../lib/theme';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  options,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onValueChange(option.value)}
          style={[
            styles.option,
            value === option.value && styles.optionSelected,
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.optionLabel}>{option.label}</Text>
          <View style={[
            styles.radio,
            value === option.value && styles.radioSelected,
          ]}>
            {value === option.value && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  optionSelected: {
    borderColor: colors.primary,
  },
  optionLabel: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    paddingRight: spacing.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});

export default RadioGroup;
