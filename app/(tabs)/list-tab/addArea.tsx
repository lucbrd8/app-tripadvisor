import { addDoc, collection } from "firebase/firestore";
import {router} from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { db } from "../../../firebaseConfig";

export default function AddArea() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const addAreaToFirestore = async () => {
    if (!name || !location) {
      alert("Fields name, location and global rating are required!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "area"), {
        name: name,
        location: location,
      });
      router.push({ pathname: "/(tabs)/list-tab"
             });
      alert("The truck rest area has been added successfully!");
    } catch (e) {
      console.error("Error adding the area: ", e);
      alert("An error occurred while adding the area. Please try again.");
    }
  };
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Add a new rest area</Text>
          <Text style={styles.subtitle}>
            {"\n"}Fill up the form to add a new truck rest area!
          </Text>
        </View>
        <View style={styles.questionBox}>
          <Text>Fill up the name of the rest area</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.questionBox}>
          <Text>Fill up the location of the rest area</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        
      </ScrollView>
      <TouchableOpacity
          style={styles.buttonContainer}
          onPress={addAreaToFirestore}
        >
          <Text style={styles.buttonText}>Add the rest area</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#B9A896",
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
  questionBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  subtitle: {
    display: "flex",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    display: "flex",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  input: {
    display: "flex",
    height: 30,
    width: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
