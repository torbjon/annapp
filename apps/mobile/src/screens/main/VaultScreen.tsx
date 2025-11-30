import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../../lib/theme";

const VaultScreen: React.FC = () => {
  const [documents] = useState<any[]>([]);

  const categories = [
    {
      id: "test_results",
      name: "Test Results",
      icon: "document-text-outline" as const,
    },
    {
      id: "prescriptions",
      name: "Prescriptions",
      icon: "medical-outline" as const,
    },
    {
      id: "referrals",
      name: "Referrals",
      icon: "paper-plane-outline" as const,
    },
    { id: "notes", name: "Notes", icon: "create-outline" as const },
    { id: "other", name: "Other", icon: "folder-outline" as const },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vault</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.annaGold} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Your Medical Documents</Text>
          <Text style={styles.sectionDescription}>
            Securely store and organize your medical records, test results, and
            health documents.
          </Text>

          {/* Categories */}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => {
              const count = documents.filter(
                (doc) => doc.category === category.id
              ).length;
              return (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Ionicons
                      name={category.icon}
                      size={24}
                      color={colors.annaGold}
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{count} files</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Recent Documents */}
          {documents.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, styles.recentTitle]}>
                Recent
              </Text>
              {documents.slice(0, 5).map((doc) => (
                <TouchableOpacity key={doc.id} style={styles.documentCard}>
                  <View style={styles.documentIcon}>
                    <Ionicons
                      name="document-outline"
                      size={20}
                      color={colors.iconMuted}
                    />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle} numberOfLines={1}>
                      {doc.title || doc.file_name}
                    </Text>
                    <Text style={styles.documentMeta}>
                      {doc.category} •{" "}
                      {new Date(doc.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.iconLight}
                  />
                </TouchableOpacity>
              ))}
            </>
          )}

          {documents.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="folder-open-outline"
                size={48}
                color={colors.mutedForeground}
              />
              <Text style={styles.emptyTitle}>No documents yet</Text>
              <Text style={styles.emptyDescription}>
                Upload your medical documents to keep them organized and
                accessible.
              </Text>
            </View>
          )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
  },
  addButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  recentTitle: {
    marginTop: spacing.md,
  },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: 2,
  },
  documentMeta: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    textTransform: "capitalize",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: "center",
    maxWidth: 250,
  },
});

export default VaultScreen;
