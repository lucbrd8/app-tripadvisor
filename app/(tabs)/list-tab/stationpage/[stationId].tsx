// app/details/[id].tsx
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  average,
  collection,
  count,
  getAggregateFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState,useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../../firebaseConfig";

interface Item {
  docId: string;
  globalRating?: number | string;
  cleanRating?: number | string;
  staffRating?: number | string;
  isShower?: boolean;
  showerRate?: number | string;
  comment?: string;
}

export default function DetailScreen() {
  // Refresh setup
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const { stationId, label, location } = useLocalSearchParams();
  const reviewQuery = query(
    collection(db, "reviews"),
    where("idArea", "==", stationId)
  );
  const router = useRouter();
  const getInformation = async () => {
    const snapshot = await getAggregateFromServer(reviewQuery, {
      averageRating: average("globalRating"),
      countReviews: count(),
    });
    return snapshot.data();
  };
  const info = getInformation();
  const globalRating = info.averageRating;
  const countReviews = info.countReviews;
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const fetchBoxes = async () => {
      const querySnapshot = await getDocs(reviewQuery);
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        globalRating: doc.data()?.globalRating || "No Rating",
        cleanRating: doc.data()?.cleanRating || "No Rating",
        staffRating: doc.data()?.staffRating || "No Rating",
        isShower: doc.data()?.isShower || false,
        showerRate: doc.data()?.showerRate || "No Rating",
        comment: doc.data()?.comment || "No Comment",
      }));
      setItems(data);
    };

    fetchBoxes();
  }, []);
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
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.questionBox}>
          <Text style={styles.text}>Name :</Text>
          <Text style={styles.hightext}>{label}</Text>
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.text}>Localation : </Text>
          <Text style={styles.hightext}> {location}</Text>
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.text}>Average global Rate : </Text>
          <Text style={styles.hightext}>{globalRating}</Text>
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.text}>Number of reviews : </Text>
          <Text style={styles.hightext}>{countReviews}</Text>
        </View>
        {items.map((item) => (
          <View style={styles.box}>
            <Text style={styles.titleText}>
              Global rating : {item.globalRating}
            </Text>
            <Text style={styles.boxText}>
              Staff rating : {item.staffRating}
            </Text>
            <Text style={styles.boxText}>
              Is there showers? : {item.isShower}
            </Text>
            <Text style={styles.boxText}>Shower rate : {item.showerRate}</Text>
            <Text style={styles.boxText}>Comment : {item.comment}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/list-tab/reviewpage/[reviewId]",
            params: { stationId: stationId, label: label },
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
  questionBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  box: {
    backgroundColor: "#483C32",
    padding: 20,
    borderRadius: 10,
    maxWidth: "100%",
    width: 500,
    color: "#B9A896",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#483C32",
  },
  hightext: {
    fontSize: 20,
    marginBottom: 8,
    color: "#483C32",
    fontWeight: "bold",
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
    width: 0.8 * window.innerWidth,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  titleText: {
    color: "#B9A896",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 15,
  },
  boxText: {
    color: "#B9A896",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexDirection: "column", // horizontal (default = column)
    justifyContent: "space-between", // répartit horizontalement
    alignItems: "center", // aligne verticalement
    padding: 20,
    gap: 15,
    backgroundColor: "#B9A896",
    paddingBottom: 100,
  },
  reviewBox: {
    backgroundColor: "#483C32",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height: "auto",
    margin: 10,
  },
});
/*
      <View style={styles.questionBox}>
        <Text style={styles.text}>Global Rate : </Text>
        <Text style={styles.hightext}>{globalRating}</Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.text}>Staff Rate : </Text>
        <Text style={styles.hightext}>{staffRating}</Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.text}>Cleaning Rate : </Text>
        <Text style={styles.hightext}>{cleanRating}</Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.text}>Shower ? : </Text>
        <Text style={styles.hightext}>{shower}</Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.text}>Shower Rate : </Text>
        <Text style={styles.hightext}>{showerRate}</Text>
      </View>
      */
