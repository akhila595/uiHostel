import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { getStudents } from "../api/studentApi";

export default function StudentsScreen() {
  const [students, setStudents] = useState<any[]>([]);

  const loadStudents = async () => {
    try {
      const data = await getStudents();

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName}</Text>

            <Text style={styles.text}>Room: {item.roomNumber}</Text>

            <Text style={styles.text}>Bed: {item.bedNumber}</Text>

            <Text style={styles.text}>Fee: ₹{item.feeAmount}</Text>

            <Text style={styles.status}>{item.status}</Text>
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
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  text: {
    color: "#6b7280",
    marginTop: 4,
  },

  status: {
    marginTop: 10,
    color: "#2563eb",
    fontWeight: "bold",
  },
});
