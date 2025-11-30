import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../../lib/theme';

const InsightsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <View style={styles.iconContainer}>
              <Ionicons name="analytics-outline" size={48} color={colors.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Your insights are coming</Text>
            <Text style={styles.emptyDescription}>
              As you track more data, anna will start showing you personalized insights about your perimenopause journey.
            </Text>
          </View>

          {/* Placeholder cards for future insights */}
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name="moon-outline" size={20} color={colors.annaGold} />
              <Text style={styles.insightTitle}>Sleep Patterns</Text>
            </View>
            <Text style={styles.insightDescription}>
              Track your sleep to see how it correlates with your symptoms
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name="heart-outline" size={20} color={colors.annaGold} />
              <Text style={styles.insightTitle}>Mood Trends</Text>
            </View>
            <Text style={styles.insightDescription}>
              Understand how your mood changes throughout your cycle
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name="trending-up-outline" size={20} color={colors.annaGold} />
              <Text style={styles.insightTitle}>Energy Levels</Text>
            </View>
            <Text style={styles.insightDescription}>
              See patterns in your energy to plan your days better
            </Text>
          </View>
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
  header: {
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  insightTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
  },
  insightDescription: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
});

export default InsightsScreen;
