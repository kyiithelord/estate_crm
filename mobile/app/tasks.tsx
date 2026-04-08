import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "./data";

export default function TasksScreen() {
  const { tasks, toggleTask } = useData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        {!tasks.length ? <Text style={styles.empty}>No tasks yet.</Text> : null}
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
              <Text style={[styles.status, task.status === "completed" ? styles.statusCompleted : styles.statusPending]}>
                {task.status}
              </Text>
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
  empty: {
    color: "#5c677d",
    fontSize: 16
  },
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4d7c8"
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
    minWidth: 98,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "capitalize"
  },
  statusPending: {
    color: "#9b5d00",
    backgroundColor: "#ffe2b8"
  },
  statusCompleted: {
    color: "#426b1f",
    backgroundColor: "#ddeccf"
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10
  },
  action: {
    minWidth: 98,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e4d7c8",
    alignItems: "center",
    justifyContent: "center"
  },
  actionText: {
    color: "#14213d",
    fontWeight: "700"
  }
});
