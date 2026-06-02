import { useCallback, useState } from "react";

import { useFocusEffect } from "expo-router";

import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { getRooms } from "../api/roomApi";

export default function RoomOccupancyScreen() {
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
      <Text style={styles.title}>Room Occupancy</Text>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.room}>Room {item.roomNumber}</Text>

            <Text style={styles.text}>
              Occupied: {item.occupiedBeds}/{item.totalBeds}
            </Text>

            <Text style={styles.available}>
              Available Beds: {item.totalBeds - item.occupiedBeds}
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
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  room: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  text: {
    marginTop: 6,
    color: "#6b7280",
  },

  available: {
    marginTop: 6,
    color: "#16a34a",
    fontWeight: "bold",
  },
});
