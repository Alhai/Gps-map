import MapView, { Polyline } from "react-native-maps";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const coordsA = [
    { latitude: 45.184269, longitude: 5.756467 }, // A
    { latitude: 45.184658, longitude: 5.756699 }, // A
    { latitude: 45.184906, longitude: 5.75683 }, // A
    { latitude: 45.184904, longitude: 5.757454 }, // A
    { latitude: 45.184616, longitude: 5.757479 }, // A
    { latitude: 45.184287, longitude: 5.757321 }, // A
    { latitude: 45.184524, longitude: 5.757299 }, // A
    { latitude: 45.184648, longitude: 5.756841 }, // A
  ];

  const coordsH = [
    { latitude: 45.184745, longitude: 5.760324 }, // H
    { latitude: 45.183496, longitude: 5.75922 }, // H
    { latitude: 45.183804, longitude: 5.759389 }, // H
    { latitude: 45.183588, longitude: 5.760236 }, // H
    { latitude: 45.184422, longitude: 5.760982 }, // H
    { latitude: 45.183274, longitude: 5.760067 }, // H
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 45.184269,
              longitude: 5.756467,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Polyline
              coordinates={coordsA}
              strokeColor="#FF0000"
              strokeWidth={6}
            />
            <Polyline
              coordinates={coordsH}
              strokeColor="#0000FF"
              strokeWidth={6}
            />
          </MapView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
