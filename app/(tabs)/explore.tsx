import * as React from "react";

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { FlashList } from "@shopify/flash-list";
import { useDebounce } from "@uidotdev/usehooks";

export default function TabTwoScreen() {
  const [searchTerm, setSearchTerm] = React.useState("js");
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState<AddressItem[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  type AddressItem = {
    properties: {
      id: string;
      label: string;
      score: number;
      housenumber: number;
      name: string;
      postcode: string;
      citycode: string;
      x: number;
      y: number;
      city: string;
      context: string;
      type: string;
      importance: number;
      street: number;
    };
  };
  React.useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
      setIsSearching(true);
      fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
          debouncedSearchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.features) {
            setIsSearching(false);
            console.error("No features in response:", data);
          } else {
            setResults(data.features);
            setIsSearching(false);
          }
        })
        .catch((error) => {
          setIsSearching(false);
          console.error("Fetch error:", error);
        });
    } else {
      setResults([]);
      if (debouncedSearchTerm)
        console.error(
          "Search term must be at least 3 characters long and start with a letter or number."
        );
    }
  }, [debouncedSearchTerm]);

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Recherche d'adresses</Text>
        <TextInput
          value={searchTerm}
          placeholder="Recherche d'adresses"
          style={styles.input}
          onChangeText={handleChange}
          autoFocus={true}
        />
        {isSearching ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.properties.id}
            renderItem={({ item }) => <Text>{item.properties.label}</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
});
