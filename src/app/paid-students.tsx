import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { getPaymentsThisMonth } from "../api/paymentApi";

export default function PaidStudentsScreen() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const data = await getPaymentsThisMonth();

      setPayments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const totalCollection = payments.reduce(
    (sum, payment) => sum + payment.amountPaid,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Paid Students</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Students Paid This Month</Text>

        <Text style={styles.summaryValue}>{payments.length}</Text>

        <Text style={styles.summaryAmount}>₹{totalCollection}</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No students paid this month</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.studentName}>{item.studentName}</Text>

              <Text style={styles.roomText}>Room: {item.roomNumber}</Text>

              <Text style={styles.amountPaid}>
                Amount Paid: ₹{item.amountPaid}
              </Text>
            </View>
          )}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  summaryCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  summaryLabel: {
    color: "#6b7280",
    fontSize: 14,
  },

  summaryValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 8,
  },

  summaryAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a34a",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  roomText: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 14,
  },

  amountPaid: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#16a34a",
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },

  emptyText: {
    color: "#6b7280",
  },
});
