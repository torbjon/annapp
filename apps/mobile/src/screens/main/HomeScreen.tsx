import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, useToast } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../../lib/theme";

const HomeScreen: React.FC = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [addedQuickTags, setAddedQuickTags] = useState<string[]>([]);
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTipExplanationOpen, setIsTipExplanationOpen] = useState(false);

  const handleQuickTag = (tag: string) => {
    toast.success(`"${tag}" added`);
    setAddedQuickTags((prev) => [...prev, tag]);
  };

  const handleSyncData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSynced(true);
      toast.success("Health data synced successfully!");
    }, 2500);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const availableQuickTags = [
    { label: "Stressed at work", value: "Stressed at work" },
    { label: "Irregular eating", value: "Irregular eating" },
  ].filter((tag) => !addedQuickTags.includes(tag.value));

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIsMenuOpen(true)}
          style={styles.headerButton}
        >
          <Ionicons name="menu" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={colors.iconMuted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Sync Data Screen */}
        {!isSynced && !isLoading && (
          <View style={styles.syncContainer}>
            <View style={styles.syncIconContainer}>
              <Ionicons name="fitness" size={40} color={colors.background} />
            </View>
            <Text style={styles.syncTitle}>Ready to check in?</Text>
            <Text style={styles.syncDescription}>
              Sync your health data to get personalized wellness insights
              tailored to your body's needs today.
            </Text>
            <TouchableOpacity
              style={styles.syncButton}
              onPress={handleSyncData}
            >
              <Ionicons name="sync" size={20} color={colors.background} />
              <Text style={styles.syncButtonText}>Sync Health Data</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading Screen */}
        {isLoading && (
          <View style={styles.syncContainer}>
            <View style={styles.syncIconContainer}>
              <ActivityIndicator size="large" color={colors.background} />
            </View>
            <Text style={styles.syncTitle}>Syncing your data...</Text>
            <Text style={styles.syncDescription}>
              Hold on, we're analyzing your health data. This will just take a
              moment.
            </Text>
          </View>
        )}

        {/* Main Home Content - After Sync */}
        {isSynced && (
          <View style={styles.mainContent}>
            {/* Main Tip Card */}
            <View style={styles.tipCard}>
              <View style={styles.tipRow}>
                <View style={styles.tipIconContainer}>
                  <Ionicons name="bulb" size={14} color={colors.background} />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>Body Drained!</Text>
                  <Text style={styles.tipDescription}>
                    Today, shrink your to-do list, take two short unplugged
                    breaks, and use a calm wind-down routine before bed to ease
                    brain and body load.
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsTipExplanationOpen(true)}
                  >
                    <Text style={styles.tipLink}>
                      Show me why this matters today
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Action CTAs */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name="restaurant-outline"
                    size={14}
                    color={colors.iconMuted}
                  />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Plan 1–3 priorities</Text>
                  <Text style={styles.actionSubtitle}>
                    2 min: write 3 tasks, park rest
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={colors.iconLight}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIconContainer}>
                  <Ionicons
                    name="leaf-outline"
                    size={14}
                    color={colors.iconMuted}
                  />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Start a calm wind-down</Text>
                  <Text style={styles.actionSubtitle}>
                    30 min pre-bed: dim lights + no screens
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={colors.iconLight}
                />
              </TouchableOpacity>
            </View>

            {/* What is behind your stats */}
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>What is behind your stats?</Text>

              {availableQuickTags.length > 0 && (
                <View style={styles.quickTagsContainer}>
                  {availableQuickTags.map((tag) => (
                    <TouchableOpacity
                      key={tag.value}
                      style={styles.quickTag}
                      onPress={() => handleQuickTag(tag.value)}
                    >
                      <Text style={styles.quickTagText}>{tag.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity style={styles.trackMoreButton}>
                <Text style={styles.trackMoreText}>Track more</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Menu Modal */}
      <Modal visible={isMenuOpen} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.iconMuted}
              />
              <Text style={styles.menuItemText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Tip Explanation Modal */}
      <Modal visible={isTipExplanationOpen} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.explanationModal}>
            <Text style={styles.explanationTitle}>Why this matters today</Text>
            <Text style={styles.explanationText}>
              Last night your sleep was shorter than usual and your recovery
              signals suggest higher stress load. That mix can cloud focus, so
              we're nudging lighter plans and deliberate wind-down today.
            </Text>
            <Text style={styles.explanationSource}>
              Based on research in SWAN memory & cognition, Greendale 2010
            </Text>
            <Button
              onPress={() => setIsTipExplanationOpen(false)}
              style={styles.explanationButton}
            >
              Got it
            </Button>
          </View>
        </View>
      </Modal>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  syncContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingTop: 120,
  },
  syncIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.annaGold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  syncTitle: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  syncDescription: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.lg,
    maxWidth: 300,
  },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.annaGold,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  syncButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.background,
  },
  mainContent: {
    paddingHorizontal: spacing.md,
    paddingTop: 18,
    paddingBottom: spacing.xl,
  },
  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  tipRow: {
    flexDirection: "row",
    gap: 12,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.annaGold,
    alignItems: "center",
    justifyContent: "center",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  tipDescription: {
    fontSize: fontSize.sm,
    color: "#374151",
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  tipLink: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.annaGold,
    textDecorationLine: "underline",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: spacing.xl,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.3)",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
  },
  actionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  statsCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.3)",
    borderRadius: borderRadius.xl,
    padding: 20,
  },
  statsTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: 20,
  },
  quickTagsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  quickTag: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: 11,
    alignItems: "center",
  },
  quickTagText: {
    fontSize: fontSize.sm,
    color: "#374151",
  },
  trackMoreButton: {
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    alignItems: "center",
  },
  trackMoreText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: 40,
  },
  menuTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: spacing.md,
  },
  menuItemText: {
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  explanationModal: {
    margin: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: "auto",
    marginBottom: "auto",
  },
  explanationTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  explanationText: {
    fontSize: fontSize.sm,
    color: "#374151",
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  explanationSource: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    marginBottom: spacing.md,
  },
  explanationButton: {
    backgroundColor: colors.annaGold,
  },
});

export default HomeScreen;
