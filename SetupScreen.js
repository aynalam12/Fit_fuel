import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

export default function SetupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const goToSearch = () => {
    if (!name.trim() || !goal.trim()) {
      alert("Please fill out both fields!");
      return;
    }
    navigation.navigate("Search", { name, goal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>FitFuel Setup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Calorie Goal (kcal)"
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
      />
      <Button title="Start → Search" onPress={goToSearch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0b0b0b" },
  h1: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    padding: 10,
    marginBottom: 10,
  },
});
