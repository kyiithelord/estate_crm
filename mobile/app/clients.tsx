import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const clients = [
  { name: "Aung Aung", interest: "Buy", phone: "+95 9 123 456 789" },
  { name: "Su Su", interest: "Rent", phone: "+95 9 987 654 321" },
  { name: "Min Thu", interest: "Buy", phone: "+95 9 444 555 666" }
];

export default function ClientsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Clients</Text>
        {clients.map((client) => (
          <View key={client.name} style={styles.card}>
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
