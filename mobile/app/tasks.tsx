import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "./data";

export default function TasksScreen() {
  const { tasks, toggleTask } = useData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.card}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.meta}>
              {task.due
                ? task.due
                : task.due_date
                  ? new Date(task.due_date).toLocaleString()
                  : "Today"}
            </Text>
            <View style={styles.actions}>
              <Text style={styles.status}>{task.status}</Text>
              <Pressable onPress={() => toggleTask(task.id)} style={styles.action}>
                <Text style={styles.actionText}>{task.status === "pending" ? "Complete" : "Reopen"}</Text>
              </Pressable>
            </View>
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
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e4d7c8"
  },
  actionText: {
    color: "#14213d",
    fontWeight: "700"
  }
});
