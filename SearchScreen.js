import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen({ route }) {
  const { name, goal } = route.params;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Serving grams for logging
  const [servingGrams, setServingGrams] = useState("100");

  // Simple in-memory day log and total kcal
  const [dayItems, setDayItems] = useState([]);
  const totalKcal = dayItems.reduce((sum, x) => sum + x.kcal, 0);
  const pct = Math.max(0, Math.min(1, goal ? totalKcal / Number(goal) : 0));

  const fetchFoods = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=10`;
      const res = await fetch(url);
      const data = await res.json();
      const foods = (data.products || [])
        .filter(
          (p) =>
            p.product_name &&
            p.nutriments &&
            p.nutriments["energy-kcal_100g"] != null
        )
        .map((p) => ({
          id: p.id || String(Math.random()),
          name: p.product_name,
          kcalPer100: Number(p.nutriments["energy-kcal_100g"]),
          image: p.image_front_thumb_url,
          protein: p.nutriments.proteins_100g,
          carbs: p.nutriments.carbohydrates_100g,
          fat: p.nutriments.fat_100g,
        }));
      setResults(foods);
    } catch (e) {
      alert("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  };

  const addToDay = (food) => {
    const grams = Number(servingGrams) || 100;
    const kcal = Math.round((food.kcalPer100 * grams) / 100);
    const item = {
      id: `${food.id}-${Date.now()}`,
      name: `${food.name} (${grams}g)`,
      kcal,
    };
    setDayItems((prev) => [item, ...prev]);
  };

  const removeFromDay = (id) => {
    setDayItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header + progress */}
      <Text style={styles.h1}>Welcome, {name}</Text>
      <Text style={styles.muted}>Goal: {goal} kcal/day</Text>

      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.mutedSmall}>
          {totalKcal} / {goal} kcal
        </Text>
      </View>

      
      <TextInput
        style={styles.input}
        placeholder="Search food (e.g., banana)"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="Serving in grams (e.g., 150)"
          value={servingGrams}
          onChangeText={setServingGrams}
          keyboardType="numeric"
        />
        <Button title="Search" onPress={fetchFoods} />
      </View>

      {loading && <ActivityIndicator size="large" style={{ margin: 16 }} />}

      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          results.length > 0 ? (
            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Results</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.foodCard}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
            ) : (
              <View style={styles.noImage} />
            )}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.mutedSmall}>
                {Math.round(item.kcalPer100)} kcal / 100g
              </Text>
              <Text style={styles.mutedSmall}>
                P:{item.protein ?? "?"}g C:{item.carbs ?? "?"}g F:{item.fat ?? "?"}g
              </Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => addToDay(item)}>
              <Text style={{ color: "white", fontWeight: "700" }}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      
      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>My Day</Text>
      {dayItems.length === 0 ? (
        <Text style={styles.mutedSmall}>Nothing yet -- pick a result and tap Add.</Text>
      ) : (
        <FlatList
          data={dayItems}
          keyExtractor={(x) => x.id}
          renderItem={({ item }) => (
            <View style={styles.dayRow}>
              <Text style={{ color: "white", flex: 1 }}>{item.name}</Text>
              <Text style={{ color: "white", marginRight: 10 }}>{item.kcal} kcal</Text>
              <TouchableOpacity onPress={() => removeFromDay(item.id)}>
                <Text style={{ color: "#ef4444" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0b0b0b" },
  h1: { color: "white", fontSize: 22, fontWeight: "800", marginBottom: 4 },
  muted: { color: "#94a3b8" },
  mutedSmall: { color: "#94a3b8", fontSize: 12 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#232323",
  },
  noImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: "#222" },
  foodName: { color: "white", fontWeight: "700" },
  addBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: { color: "white", fontSize: 16, fontWeight: "700" },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#232323",
    padding: 10,
    marginTop: 8,
  },
  progressWrap: { marginTop: 8, marginBottom: 6 },
  progressTrack: {
    height: 10,
    backgroundColor: "#1f2937",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: { height: "100%", backgroundColor: "#22c55e" },
});