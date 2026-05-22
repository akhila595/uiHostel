import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { createRoom } from "../api/roomApi";

export default function AddRoomScreen() {
  const [roomNumber, setRoomNumber] = useState("");

  const [totalBeds, setTotalBeds] = useState("");

  const [roomType, setRoomType] = useState("");

  const [floorNumber, setFloorNumber] = useState("");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  const saveRoom = async () => {
    try {
      setLoading(true);

      await createRoom({
        roomNumber,

        totalBeds: Number(totalBeds),

        roomType,

        floorNumber: Number(floorNumber),

        remarks,
      });

      Alert.alert("Success", "Room Added Successfully");

      setRoomNumber("");

      setTotalBeds("");

      setRoomType("");

      setFloorNumber("");

      setRemarks("");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to add room",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Room</Text>

        <TextInput
          placeholder="Room Number"
          style={styles.input}
          value={roomNumber}
          onChangeText={setRoomNumber}
        />

        <TextInput
          placeholder="Total Beds"
          keyboardType="numeric"
          style={styles.input}
          value={totalBeds}
          onChangeText={setTotalBeds}
        />

        <TextInput
          placeholder="Room Type"
          style={styles.input}
          value={roomType}
          onChangeText={setRoomType}
        />

        <TextInput
          placeholder="Floor Number"
          keyboardType="numeric"
          style={styles.input}
          value={floorNumber}
          onChangeText={setFloorNumber}
        />

        <TextInput
          placeholder="Remarks"
          style={styles.input}
          value={remarks}
          onChangeText={setRemarks}
        />

        <TouchableOpacity style={styles.button} onPress={saveRoom}>
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Save Room"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 25,
    color: "#111827",
  },

  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
