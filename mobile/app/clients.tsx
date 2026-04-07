import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "./data";

export default function ClientsScreen() {
  const { clients } = useData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Clients</Text>
        {clients.map((client) => (
          <View key={client.id} style={styles.card}>
            <Text style={styles.name}>{client.name}</Text>
            <Text style={styles.meta}>{client.interest}</Text>
            <Text style={styles.meta}>{client.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f3ea"
  },
  container: {
    padding: 20,
    gap: 12
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#14213d"
  },
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#ffffff"
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14213d"
  },
  meta: {
    marginTop: 4,
    color: "#5c677d"
  }
});
