import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { getStudents } from "../api/studentApi";

import { payFee } from "../api/paymentApi";

export default function PaymentsScreen() {
  const [students, setStudents] = useState<any[]>([]);

  const [paidStudents, setPaidStudents] = useState<number[]>([]);

  const loadStudents = async () => {
    try {
      const data = await getStudents();

      // only students whose due date
      // is today or before today

      const today = new Date();

      const pendingStudents = data.filter((student: any) => {
        const dueDate = new Date(student.nextDueDate);

        return dueDate <= today;
      });

      setStudents(pendingStudents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const markAsPaid = async (student: any) => {
    try {
      await payFee({
        studentId: student.id,

        amountPaid: student.feeAmount,

        paymentMode: "CASH",

        remarks: "Monthly Fee",
      });

      setPaidStudents((prev) => [...prev, student.id]);

      Alert.alert("Success", `${student.fullName} marked as paid`);

      // reload list after payment

      loadStudents();
    } catch (error: any) {
      console.log(error);

      Alert.alert("Error", error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fee Payments</Text>

      {students.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No pending fee payments</Text>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isPaid = paidStudents.includes(item.id);

            return (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.fullName}</Text>

                  <Text style={styles.room}>Room {item.roomNumber}</Text>

                  <Text style={styles.amount}>Fee: ₹{item.feeAmount}</Text>

                  <Text style={styles.dueDate}>
                    Due Date: {item.nextDueDate}
                  </Text>
                </View>

                {isPaid ? (
                  <View style={styles.paidButton}>
                    <Text style={styles.paidText}>Paid</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => markAsPaid(item)}
                  >
                    <Text style={styles.payText}>Mark Paid</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      )}
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  room: {
    marginTop: 5,
    color: "#6b7280",
  },

  amount: {
    marginTop: 5,
    color: "#2563eb",
    fontWeight: "600",
  },

  dueDate: {
    marginTop: 5,
    color: "#dc2626",
    fontWeight: "600",
  },

  payButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  payText: {
    color: "#fff",
    fontWeight: "bold",
  },

  paidButton: {
    backgroundColor: "#d1fae5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },

  paidText: {
    color: "#065f46",
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: 16,
  },
});
