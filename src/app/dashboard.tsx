import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getDashboardSummary,
  getDueTodayStudents,
  getOverdueStudents,
} from "../api/dashboardApi";

import { getRooms } from "../api/roomApi";

export default function DashboardScreen() {
  const [dashboard, setDashboard] = useState<any>(null);

  const [dueToday, setDueToday] = useState<any[]>([]);

  const [overdue, setOverdue] = useState<any[]>([]);

  const [rooms, setRooms] = useState<any[]>([]);

  const [hostelName, setHostelName] = useState("");

  const loadData = async () => {
    try {
      const hostel = await AsyncStorage.getItem("hostelName");

      if (hostel) {
        setHostelName(hostel);
      }

      const summary = await getDashboardSummary();

      const due = await getDueTodayStudents();

      const overdueStudents = await getOverdueStudents();

      const roomsData = await getRooms();

      setDashboard(summary);

      setDueToday(due);

      setOverdue(overdueStudents);

      setRooms(roomsData);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const summaryCards = [
    {
      title: "Students",
      value: dashboard?.totalStudents || 0,
      color: "#2563eb",
    },

    {
      title: "Rooms",
      value: dashboard?.totalRooms || 0,
      color: "#7c3aed",
    },

    {
      title: "Occupied",
      value: dashboard?.occupiedBeds || 0,
      color: "#ea580c",
    },

    {
      title: "Available",
      value: dashboard?.availableBeds || 0,
      color: "#16a34a",
    },
    {
      title: "Pending ₹",
      value: dashboard?.pendingAmount || 0,
      color: "#dc2626",
    },

    {
      title: "Collected ₹",
      value: dashboard?.collectedThisMonth || 0,
      color: "#16a34a",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}

        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Welcome Back 👋</Text>

          <Text style={styles.hostelName}>
            {hostelName || "Hostel Dashboard"}
          </Text>

          <Text style={styles.subHeader}>Manage students, rooms and fees</Text>
        </View>

        {/* SUMMARY */}

        <View style={styles.summaryGrid}>
          {summaryCards.map((item, index) => (
            <View
              key={index}
              style={[
                styles.summaryCard,
                {
                  borderLeftColor: item.color,
                },
              ]}
            >
              <Text style={styles.summaryTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.summaryValue,
                  {
                    color: item.color,
                  },
                ]}
              >
                {item.title.includes("₹") ? `₹${item.value}` : item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* QUICK ACTIONS */}

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/students")}
          >
            <Text style={styles.actionText}>Students</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/rooms")}
          >
            <Text style={styles.actionText}>Rooms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/payments")}
          >
            <Text style={styles.actionText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/paid-students")}
          >
            <Text style={styles.actionText}>Paid Students</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/overdue-students")}
          >
            <Text style={styles.actionText}>Overdue Students</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/room-occupancy")}
          >
            <Text style={styles.actionText}>Room Occupancy</Text>
          </TouchableOpacity>
        </View>
        {/* DUE TODAY */}

        <Text style={styles.sectionTitle}>Fee Due Today</Text>

        {dueToday.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No fee dues today</Text>
          </View>
        ) : (
          dueToday.slice(0, 5).map((student, index) => (
            <View key={index} style={styles.listCard}>
              <Text style={styles.studentName}>{student.fullName}</Text>

              <Text style={styles.roomText}>Room {student.roomNumber}</Text>
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  headerContainer: {
    marginTop: 10,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 16,
    color: "#6b7280",
  },

  hostelName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },

  subHeader: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  summaryCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 5,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  summaryTitle: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "500",
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 22,
    marginBottom: 12,
  },

  actionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionButton: {
    width: "48%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#2563eb",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },

  listCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  overdueCard: {
    backgroundColor: "#fee2e2",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  roomText: {
    marginTop: 5,
    color: "#6b7280",
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
  },

  emptyText: {
    color: "#6b7280",
  },
});
