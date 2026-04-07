import { Link } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const tasks = [
  "Call Aung Aung about condo viewing",
  "Send offer details to Su Su",
  "Confirm visit time with Min Thu"
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>Mobile MVP</Text>
        <Text style={styles.title}>Daily work for agents on the move.</Text>
        <Text style={styles.subtitle}>
          Keep the mobile app focused on fast follow-up, reminders, and quick access to deals and clients.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          {tasks.map((task) => (
            <Text key={task} style={styles.listItem}>
              • {task}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          <Link href="/clients" style={styles.linkCard}>
            Clients
          </Link>
          <Link href="/deals" style={styles.linkCard}>
            Deals
          </Link>
          <Link href="/tasks" style={styles.linkCard}>
            Tasks
          </Link>
          <Link href="/properties" style={styles.linkCard}>
            Properties
          </Link>
        </View>
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
    gap: 16
  },
  eyebrow: {
    color: "#bc6c25",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    color: "#14213d"
  },
  subtitle: {
    color: "#5c677d",
    fontSize: 16,
    lineHeight: 22
  },
  card: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#fff7eb"
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#14213d",
    marginBottom: 10
  },
  listItem: {
    color: "#354463",
    marginBottom: 8
  },
  grid: {
    gap: 12
  },
  linkCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    color: "#14213d",
    fontWeight: "700",
    overflow: "hidden"
  }
});
