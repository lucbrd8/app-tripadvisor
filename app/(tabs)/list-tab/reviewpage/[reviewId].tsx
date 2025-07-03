import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { db } from "../../../../firebaseConfig";

export default function AddReview() {
  const { stationId, label } = useLocalSearchParams();
  const [isShower, setisShower] = useState(false);
  const [showerRate, setShowerRate] = useState(false);
  const [globalRating, setglobalRating] = useState(0);
  const [cleanRating, setcleanRating] = useState(0);
  const [staffRating, setstaffRating] = useState(0);
  const [comment, setComment] = useState("");
  const addReviewToFirestore = async () => {
    if (globalRating == 0) {
      alert("Global rating is required!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        idArea: stationId,
        isShower: isShower,
        showerRate: isShower ? showerRate : false,
        globalRating: globalRating,
        cleanRating: cleanRating != 0 ? cleanRating : false,
        staffRating: staffRating != 0 ? staffRating : false,
        comment: comment,
      });
      router.push({ pathname: "/(tabs)/list-tab"
, params: { stationId: stationId }
       });
      alert("The review has been added successfully!");
    } catch (e) {
      console.error("Error adding the review: ", e);
      alert("An error occurred while adding the review. Please try again.");
    }
  };
  return (
    <View style={styles.screen}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
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
          <Text>Does the rest area have a shower?</Text>
          <Switch value={isShower} onValueChange={setisShower} />
        </View>
        {isShower && (
          <View style={styles.questionBox}>
            <Text>What is the rate of the shower?</Text>
            <StarRating
              rating={showerRate}
              onChange={setShowerRate}
              starSize={25}
              enableHalfStar={false}
              maxStars={5}
            />
          </View>
        )}
        <View style={styles.questionBox}>
          <Text>Leave a comment :</Text>
          <TextInput
            style={styles.input}
            placeholder="Your comment"
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={2}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={addReviewToFirestore}
      >
        <Text style={styles.buttonText}>Add the review </Text>
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
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
