import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StarRating from "react-native-star-rating-widget";
import { db } from "../../firebaseConfig";

export default function AddArea() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isShower, setisShower] = useState(false);
  const [showerRate, setShowerRate] = useState(false);
  const [globalRating, setglobalRating] = useState(0);
  const [cleanRating, setcleanRating] = useState(0);
  const [staffRating, setstaffRating] = useState(0);
  const addToFirestore = async () => {
    if (!name || !location || globalRating == 0) {
      alert("Fiels name, location and global rating are required!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "area"), {
        name: name,
        location: location,
        isShower: isShower,
        showerRate: isShower ? showerRate : false,
        globalRating: globalRating,
        cleanRating: cleanRating != 0 ? cleanRating : false,
        staffRating: staffRating != 0 ? staffRating : false,
      });
      alert("The truck rest area has been added successfully!");
    } catch (e) {
      console.error("Error adding the area: ", e);
      alert("An error occurred while adding the area. Please try again.");
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Truckadvisor</Text>
          <Text style={styles.subtitle}>
            {"\n"}Welcome to Truckadvisor, your help to live an easy life as a
            trucker!
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
        <View style={styles.questionBox}>
          <Text>How good was the area?</Text>
          <StarRating
            rating={globalRating}
            onChange={setglobalRating}
            starSize={25}
            enableHalfStar={false}
            maxStars={5}
          />
        </View>
        <View style={styles.questionBox}>
          <Text>How clean was the rest area?</Text>
          <StarRating
            rating={cleanRating}
            onChange={setcleanRating}
            starSize={25}
            enableHalfStar={false}
            maxStars={5}
          />
        </View>
        <View style={styles.questionBox}>
          <Text>How friendly were the staff?</Text>
          <StarRating
            rating={staffRating}
            onChange={setstaffRating}
            starSize={25}
            enableHalfStar={false}
            maxStars={5}
          />
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.container}>
            Does the rest area have a shower?
          </Text>
          <Switch value={isShower} onValueChange={setisShower} />
          <View style={styles.questionBox}>
            {isShower && (
              <View style={styles.questionBox}>
                <Text>If yes, what is the rate of the shower?</Text>
                <StarRating
                  rating={showerRate}
                  onChange={setShowerRate}
                  starSize={25}
                  enableHalfStar={false}
                  maxStars={5}
                />
              </View>
            )}
          </View>
        </View>
        <Button onPress={addToFirestore} title="Add the truck rest area" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  questionBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 10,
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
  },
});
