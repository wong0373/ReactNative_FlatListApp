import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data");
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.completed}>
        {item.completed ? "Completed" : "Not Completed"}
      </Text>
    </View>
  );

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  comment: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  completed: {
    fontSize: 14,
    color: "#f87f87",
    marginBottom: 4,
  },
});
