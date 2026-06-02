import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { router } from "expo-router";

import { getRooms } from "../api/roomApi";

export default function RoomsScreen() {
  const [rooms, setRooms] = useState<any[]>([]);

  const loadRooms = async () => {
    try {
      const data = await getRooms();

      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRooms();
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rooms</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-room")}
        >
          <Text style={styles.buttonText}>Add Room</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.roomNumber}>Room {item.roomNumber}</Text>

            <Text style={styles.text}>Type: {item.roomType}</Text>

            <Text style={styles.text}>Floor: {item.floorNumber}</Text>

            <Text style={styles.text}>
              Beds: {item.occupiedBeds}/{item.totalBeds}
            </Text>
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

  roomNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  text: {
    color: "#6b7280",
    marginTop: 4,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
