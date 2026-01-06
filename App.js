import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "./screens/SearchScreen";
import SetupScreen from "./screens/SetupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0b0b0b" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#0b0b0b" },
        }}
      >
        <Stack.Screen name="Setup" component={SetupScreen} options={{ title: "Setup" }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Search Foods" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
