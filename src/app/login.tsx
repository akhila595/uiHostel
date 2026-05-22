import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginApi } from "../api/authApi";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const data = await loginApi(email, password);

      await AsyncStorage.setItem("token", data.token);

      await AsyncStorage.setItem("customerId", data.customerId.toString());

      await AsyncStorage.setItem("hostelName", data.hostelName);

      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <Text style={styles.logo}>🏨</Text>

        <Text style={styles.title}>Hostel Management</Text>

        <Text style={styles.subTitle}>Manage students, rooms and fees</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>
            {loading ? "Please wait..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563eb",
    justifyContent: "center",
  },

  topSection: {
    alignItems: "center",
    marginBottom: 35,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  subTitle: {
    fontSize: 15,
    color: "#dbeafe",
    marginTop: 8,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 25,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },

  loginText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    fontSize: 15,
    backgroundColor: "#f9fafb",
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
