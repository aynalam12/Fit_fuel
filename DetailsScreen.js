import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { name, goal } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Hello, {name}!</Text>
      <Text style={styles.muted}>Your daily calorie goal: {goal} kcal</Text>

      <View style={styles.card}>
        <Text style={styles.h2}>API Used: OpenFoodFacts</Text>
        <Text style={styles.body}>
          Free nutrition data -- calories, protein, carbs, and fat per 100g.
        </Text>
        <Text style={styles.code}>
          https://world.openfoodfacts.org/cgi/search.pl?search_terms=chicken&search_simple=1&action=process&json=1&page_size=10
        </Text>
        <Text style={styles.body}>
          Key fields we use:
          {"\n"}- product_name
          {"\n"}- nutriments.energy-kcal_100g
          {"\n"}- nutriments.proteins_100g, carbohydrates_100g, fat_100g
          {"\n"}- image_front_thumb_url
        </Text>
      </View>

      <Button
        title="-> Go to Search Screen"
        onPress={() => navigation.navigate("Search", { name, goal })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0b0b0b" },
  h1: { color: "white", fontSize: 22, fontWeight: "bold" },
  h2: { color: "white", fontSize: 18, fontWeight: "600", marginTop: 10 },
  muted: { color: "#94a3b8", marginBottom: 8 },
  body: { color: "white", marginTop: 6, lineHeight: 20 },
  card: {
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#232323",
    padding: 12,
    marginVertical: 15,
  },
  code: {
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    padding: 6,
    borderRadius: 6,
    marginTop: 8,
    fontSize: 12,
    fontFamily: "monospace",
  },
});