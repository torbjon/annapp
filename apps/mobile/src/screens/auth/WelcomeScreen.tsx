import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/ui';
import { colors, fontSize, fontWeight, spacing } from '../../lib/theme';
import { RootStackParamList } from '../../navigation/types';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Image
            source={require('../../assets/anna-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.tagline}>
          The operating system for women in perimenopause
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          >
            Create account
          </Button>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            variant="outline"
            style={styles.button}
          >
            Sign in
          </Button>
        </View>
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
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: 'center',
    gap: spacing.md,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },
  logo: {
    width: 256,
    height: 80,
  },
  tagline: {
    fontSize: 17,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 393,
    gap: 12,
    marginTop: spacing.xxl,
  },
  button: {
    width: '100%',
  },
});

export default WelcomeScreen;
