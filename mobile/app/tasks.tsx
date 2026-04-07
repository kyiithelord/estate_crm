import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const tasks = [
  { title: "Call Aung Aung", due: "Today 4:00 PM", status: "Pending" },
  { title: "Prepare visit notes", due: "Tomorrow 10:00 AM", status: "Pending" },
  { title: "Update closed deal", due: "Done", status: "Completed" }
];

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        {tasks.map((task) => (
          <View key={task.title} style={styles.card}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.meta}>{task.due}</Text>
            <Text style={styles.status}>{task.status}</Text>
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
  taskTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#14213d"
  },
  meta: {
    marginTop: 4,
    color: "#5c677d"
  },
  status: {
    marginTop: 8,
    color: "#bc6c25",
    fontWeight: "700"
  }
});
