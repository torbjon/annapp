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
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../../lib/theme";

const CalendarScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments] = useState<any[]>([]);

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getStartDayOffset = () => {
    const start = startOfMonth(currentDate);
    return start.getDay();
  };

  const hasAppointment = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return appointments.some((apt) => apt.appointment_date === dateStr);
  };

  const days = getDaysInMonth();
  const startOffset = getStartDayOffset();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Month Navigation */}
          <View style={styles.monthNav}>
            <TouchableOpacity
              onPress={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.foreground}
              />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {format(currentDate, "MMMM yyyy")}
            </Text>
            <TouchableOpacity
              onPress={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.foreground}
              />
            </TouchableOpacity>
          </View>

          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Text key={day} style={styles.dayHeader}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {/* Empty cells for offset */}
            {Array.from({ length: startOffset }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.dayCell} />
            ))}

            {/* Day cells */}
            {days.map((day) => {
              const isSelected =
                selectedDate &&
                format(selectedDate, "yyyy-MM-dd") ===
                  format(day, "yyyy-MM-dd");
              const hasApt = hasAppointment(day);

              return (
                <TouchableOpacity
                  key={day.toISOString()}
                  style={[
                    styles.dayCell,
                    isToday(day) && styles.todayCell,
                    isSelected && styles.selectedCell,
                  ]}
                  onPress={() => setSelectedDate(day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isToday(day) && styles.todayText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {format(day, "d")}
                  </Text>
                  {hasApt && <View style={styles.appointmentDot} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Selected Date Appointments */}
          {selectedDate && (
            <View style={styles.appointmentsSection}>
              <Text style={styles.appointmentsTitle}>
                {format(selectedDate, "EEEE, MMMM d")}
              </Text>
              {appointments
                .filter(
                  (apt) =>
                    apt.appointment_date === format(selectedDate, "yyyy-MM-dd")
                )
                .map((apt) => (
                  <View key={apt.id} style={styles.appointmentCard}>
                    <Text style={styles.appointmentTitle}>{apt.title}</Text>
                    {apt.appointment_time && (
                      <Text style={styles.appointmentTime}>
                        {apt.appointment_time}
                      </Text>
                    )}
                    {apt.description && (
                      <Text style={styles.appointmentDescription}>
                        {apt.description}
                      </Text>
                    )}
                  </View>
                ))}
              {appointments.filter(
                (apt) =>
                  apt.appointment_date === format(selectedDate, "yyyy-MM-dd")
              ).length === 0 && (
                <Text style={styles.noAppointments}>No appointments</Text>
              )}
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
    justifyContent: "center",
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
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  monthTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
  },
  dayHeaders: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  dayHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.mutedForeground,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.full,
  },
  todayCell: {
    backgroundColor: colors.surface,
  },
  selectedCell: {
    backgroundColor: colors.annaGold,
  },
  dayText: {
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
  todayText: {
    fontWeight: fontWeight.bold,
  },
  selectedText: {
    color: colors.background,
    fontWeight: fontWeight.bold,
  },
  appointmentDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.annaGold,
  },
  appointmentsSection: {
    marginTop: spacing.xl,
  },
  appointmentsTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  appointmentTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.foreground,
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: fontSize.sm,
    color: colors.annaGold,
    marginBottom: 4,
  },
  appointmentDescription: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  noAppointments: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
});

export default CalendarScreen;
