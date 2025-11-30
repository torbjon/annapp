import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, borderRadius, fontSize, fontWeight } from '../../lib/theme';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: icon ? 'flex-start' : 'center',
      borderRadius: borderRadius.md,
      gap: 16,
    };

    // Size styles
    switch (size) {
      case 'sm':
        baseStyle.height = 40;
        baseStyle.paddingHorizontal = 12;
        break;
      case 'lg':
        baseStyle.height = 54;
        baseStyle.paddingHorizontal = 24;
        break;
      default:
        baseStyle.height = 48;
        baseStyle.paddingHorizontal = 16;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseStyle.backgroundColor = colors.card;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.border;
        baseStyle.borderRadius = borderRadius.xxl;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'link':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.height = 'auto' as any;
        baseStyle.paddingHorizontal = 0;
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
    }

    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: fontWeight.semibold,
    };

    // Size styles
    switch (size) {
      case 'sm':
        baseTextStyle.fontSize = fontSize.sm;
        break;
      case 'lg':
        baseTextStyle.fontSize = fontSize.lg;
        break;
      default:
        baseTextStyle.fontSize = fontSize.base;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
      case 'ghost':
        baseTextStyle.color = colors.foreground;
        break;
      case 'link':
        baseTextStyle.color = colors.foreground;
        baseTextStyle.textDecorationLine = 'underline';
        break;
      default:
        baseTextStyle.color = colors.primaryForeground;
    }

    return baseTextStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'default' ? colors.primaryForeground : colors.foreground}
          size="small"
        />
      );
    }

    const textElement = (
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    );

    if (!icon) {
      return textElement;
    }

    return (
      <>
        {iconPosition === 'left' && icon}
        {textElement}
        {iconPosition === 'right' && icon}
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
