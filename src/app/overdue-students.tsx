import { useEffect, useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { getOverdueStudents } from "../api/dashboardApi";

export default function OverdueStudentsScreen() {
  const [students, setStudents] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const data = await getOverdueStudents();

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Overdue Students</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text>No overdue students</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName}</Text>

            <Text style={styles.text}>Room {item.roomNumber}</Text>

            <Text style={styles.fee}>Fee: ₹{item.feeAmount}</Text>

            <Text style={styles.dueDate}>Due Date: {item.nextDueDate}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fee2e2",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  text: {
    color: "#6b7280",
    marginTop: 4,
  },

  fee: {
    color: "#2563eb",
    marginTop: 8,
    fontWeight: "bold",
  },

  dueDate: {
    color: "#dc2626",
    marginTop: 6,
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
});
