import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import {
  getStudentById,
  updateStudent,
  vacateStudent,
} from "../api/studentApi";

export default function EditStudentScreen() {
  const { id } = useLocalSearchParams();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [status, setStatus] = useState("");

  const [student, setStudent] = useState<any>(null);

  const loadStudent = async () => {
    try {
      const data = await getStudentById(Number(id));

      setStudent(data);

      setFullName(data.fullName || "");
      setPhoneNumber(data.phoneNumber || "");
      setFeeAmount(String(data.feeAmount || ""));
      setStatus(data.status || "");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to load student");
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const updateStudentData = async () => {
    try {
      await updateStudent(Number(id), {
        fullName,
        phoneNumber,
        parentPhone: student?.parentPhone || "",
        aadhaarNumber: student?.aadhaarNumber || "",
        joiningDate: student?.joiningDate,
        feeAmount: Number(feeAmount),
        roomId: student?.roomId,
        bedId: student?.bedId,
        address: student?.address || "",
        remarks: student?.remarks || "",
      });

      Alert.alert("Success", "Student Updated Successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to update student");
    }
  };

  const handleVacate = async () => {
    Alert.alert(
      "Vacate Student",
      "Are you sure you want to vacate this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Vacate",
          style: "destructive",
          onPress: async () => {
            try {
              await vacateStudent(Number(id));

              setStatus("VACATED");

              Alert.alert("Success", "Student Vacated Successfully", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              console.log(error);

              Alert.alert("Error", "Failed to vacate student");
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Edit Student</Text>

        <Text
          style={[
            styles.status,
            {
              color: status === "ACTIVE" ? "#16a34a" : "#dc2626",
            },
          ]}
        >
          Status: {status}
        </Text>

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

        <TouchableOpacity
          style={styles.updateButton}
          onPress={updateStudentData}
        >
          <Text style={styles.buttonText}>Update Student</Text>
        </TouchableOpacity>

        {status === "ACTIVE" && (
          <TouchableOpacity style={styles.vacateButton} onPress={handleVacate}>
            <Text style={styles.buttonText}>Vacate Student</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 15,
    color: "#111827",
  },

  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
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

  updateButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },

  vacateButton: {
    backgroundColor: "#dc2626",
    padding: 18,
    borderRadius: 16,
    marginTop: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
