import { useCallback, useState } from "react";

import { useFocusEffect } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

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

  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Students</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-student")}
        >
          <Text style={styles.buttonText}>Add Student</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName}</Text>

            <Text style={styles.text}>Room: {item.roomNumber}</Text>

            <Text style={styles.text}>Bed: {item.bedNumber}</Text>

            <Text style={styles.text}>Fee: ₹{item.feeAmount}</Text>

            <Text
              style={[
                styles.status,
                {
                  color: item.status === "ACTIVE" ? "#16a34a" : "#dc2626",
                },
              ]}
            >
              {item.status}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname: "/edit-student",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>✏️ Edit</Text>
              </TouchableOpacity>
            </View>
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
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 14,
  },

  editButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
