import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "./data";

const stageLabels = {
  new: "New",
  contacted: "Contacted",
  visit: "Visit",
  negotiation: "Negotiation",
  closed: "Closed"
} as const;

export default function DealsScreen() {
  const { deals, advanceDeal, clientLookup, propertyLookup } = useData();
  const grouped = deals.reduce<Record<string, typeof deals>>((acc, deal) => {
    acc[deal.stage] = acc[deal.stage] ? [...acc[deal.stage], deal] : [deal];
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Deals</Text>
        {Object.entries(stageLabels).map(([stageKey, label]) => (
          <View key={stageKey} style={styles.card}>
            <Text style={styles.stage}>{label}</Text>
            {(grouped[stageKey] || []).map((deal) => {
              const label =
                deal.title ||
                `${clientLookup.get(deal.client_id ?? 0) ?? "Client"} - ${
                  propertyLookup.get(deal.property_id ?? 0) ?? "Property"
                }`;
              return (
              <View key={deal.id} style={styles.dealRow}>
                <Text style={styles.deal}>• {label}</Text>
                {stageKey !== "closed" ? (
                  <Pressable onPress={() => advanceDeal(deal.id)} style={styles.action}>
                    <Text style={styles.actionText}>Advance</Text>
                  </Pressable>
                ) : null}
              </View>
              );
            })}
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
  dealRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  deal: {
    color: "#354463",
    marginBottom: 6
  },
  action: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e4d7c8"
  },
  actionText: {
    color: "#14213d",
    fontWeight: "700"
  }
});
