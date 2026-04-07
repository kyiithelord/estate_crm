import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const groups = [
  { stage: "New", deals: ["Aung Aung - Lanmadaw Condo", "Su Su - Insein House"] },
  { stage: "Contacted", deals: ["Min Thu - Sanchaung Apartment"] },
  { stage: "Visit", deals: ["Mya Mya - Dagon Land"] },
  { stage: "Negotiation", deals: ["Ko Lin - Bahan Condo"] },
  { stage: "Closed", deals: ["Hnin - North Okkalapa House"] }
];

export default function DealsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Deals</Text>
        {groups.map((group) => (
          <View key={group.stage} style={styles.card}>
            <Text style={styles.stage}>{group.stage}</Text>
            {group.deals.map((deal) => (
              <Text key={deal} style={styles.deal}>
                • {deal}
              </Text>
            ))}
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
    backgroundColor: "#fff7eb"
  },
  stage: {
    fontSize: 18,
    fontWeight: "700",
    color: "#bc6c25",
    marginBottom: 8
  },
  deal: {
    color: "#354463",
    marginBottom: 6
  }
});
