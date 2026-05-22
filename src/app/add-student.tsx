import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { Dropdown } from "react-native-element-dropdown";

import { createStudent } from "../api/studentApi";

import { getRooms } from "../api/roomApi";

import API from "../api/api";

export default function AddStudentScreen() {
  const [fullName, setFullName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [feeAmount, setFeeAmount] = useState("");

  const [rooms, setRooms] = useState<any[]>([]);

  const [beds, setBeds] = useState<any[]>([]);

  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [selectedBed, setSelectedBed] = useState<any>(null);

  // LOAD ROOMS

  const loadRooms = async () => {
    try {
      const data = await getRooms();

      const formattedRooms = data.map((room: any) => ({
        label: `Room ${room.roomNumber}`,

        value: room.id,
      }));

      setRooms(formattedRooms);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD BEDS BASED ON ROOM

  const loadBeds = async (roomId: number) => {
    try {
      const response = await API.get(`/api/v1/beds/room/${roomId}`);

      const availableBeds = response.data.filter(
        (bed: any) => bed.status === "AVAILABLE",
      );

      const formattedBeds = availableBeds.map((bed: any) => ({
        label: bed.bedNumber,

        value: bed.id,
      }));

      setBeds(formattedBeds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const saveStudent = async () => {
    try {
      await createStudent({
        fullName,

        phoneNumber,

        parentPhone: "9999999999",

        aadhaarNumber: "123456789012",

        joiningDate: "2026-05-22",

        feeAmount: Number(feeAmount),

        roomId: selectedRoom,

        bedId: selectedBed,

        address: "Hyderabad",

        remarks: "New Student",
      });

      Alert.alert("Success", "Student Added Successfully");

      setFullName("");

      setPhoneNumber("");

      setFeeAmount("");

      setSelectedRoom(null);

      setSelectedBed(null);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to add student");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Student</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          placeholder="Fee Amount"
          keyboardType="numeric"
          style={styles.input}
          value={feeAmount}
          onChangeText={setFeeAmount}
        />

        {/* ROOM DROPDOWN */}

        <Text style={styles.label}>Select Room</Text>

        <Dropdown
          style={styles.dropdown}
          data={rooms}
          labelField="label"
          valueField="value"
          placeholder="Choose Room"
          value={selectedRoom}
          onChange={(item) => {
            setSelectedRoom(item.value);

            setSelectedBed(null);

            loadBeds(item.value);
          }}
        />

        {/* BED DROPDOWN */}

        <Text style={styles.label}>Select Bed</Text>

        <Dropdown
          style={styles.dropdown}
          data={beds}
          labelField="label"
          valueField="value"
          placeholder="Choose Bed"
          value={selectedBed}
          onChange={(item) => {
            setSelectedBed(item.value);
          }}
        />

        <TouchableOpacity style={styles.button} onPress={saveStudent}>
          <Text style={styles.buttonText}>Save Student</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#111827",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#374151",
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 55,
    marginBottom: 18,

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
