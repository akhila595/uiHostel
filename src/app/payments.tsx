import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payments Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
