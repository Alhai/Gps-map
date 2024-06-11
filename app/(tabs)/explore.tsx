import * as React from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDebounce } from "@uidotdev/usehooks";

export default function TabTwoScreen() {
  const [searchTerm, setSearchTerm] = React.useState("js");
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Debounce</Text>
      <TextInput
        value={searchTerm}
        placeholder="Search HN"
        style={styles.input}
        onChangeText={handleChange}
        autoFocus={true}
      />
      {isSearching ? <ActivityIndicator size="large" /> : null}
      <Text>Debounced Search Term: {debouncedSearchTerm}</Text>
    </View>
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
