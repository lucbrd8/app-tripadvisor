// app/details/[id].tsx
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetailScreen() {
  const {
    id,
    label,
    globalRating,
    cleanRating,
    location,
    isShower,
    staffRating,
    showerRate,
  } = useLocalSearchParams();
  const router = useRouter();

  let shower: string = "Non spécifié";

  if (isShower == "false") {
    shower = "Yes";
  } else {
    shower = "No";
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Détails",
          headerStyle: {
            backgroundColor: "#483C32",
          },
          headerTintColor: "#B9A896",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Text style={styles.text}>Name : {label}</Text>
      <Text style={styles.text}>Global Rate : {globalRating}</Text>
      <Text style={styles.text}>Localisation : {location}</Text>
      <Text style={styles.text}>Staff Rate : {staffRating}</Text>
      <Text style={styles.text}>Cleaning Rate : {cleanRating}</Text>
      <Text style={styles.text}>Shower ? : {shower}</Text>
      <Text style={styles.text}>Shower Rate : {showerRate}</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          router.push({
            pathname: "../(list-subtabs)/addReview[id]",
            params: { id, label },
          })
        }
      >
        <Text style={styles.buttonText}>Add a review on the rest area</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#B9A896",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#483C32",
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: "#483C32",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#65a765",
    padding: 15,
    height: 50,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
