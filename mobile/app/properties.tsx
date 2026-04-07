import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "./data";

export default function PropertiesScreen() {
  const { properties } = useData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Properties</Text>
        {properties.map((property) => (
          <View key={property.id} style={styles.card}>
            <Text style={styles.propertyTitle}>{property.title}</Text>
            <Text style={styles.meta}>{"property_type" in property ? property.property_type : property.type}</Text>
            <Text style={styles.meta}>{property.location}</Text>
            <Text style={styles.meta}>{property.status}</Text>
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
  propertyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14213d"
  },
  meta: {
    marginTop: 4,
    color: "#5c677d"
  }
});
