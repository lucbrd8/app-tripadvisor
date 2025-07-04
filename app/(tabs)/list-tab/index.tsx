import { db } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  average,
  collection,
  getAggregateFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


interface Item {
  stationId: string;
  label?: string;
  location?: string;
  globalRating?: number;
  staffRating?: number;
  cleanRating?: number;
  showerRate?: number;
}

export default function AboutScreen() {
  // Refresh setup
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const fetchBoxes = async () => {
      const querySnapshot = await getDocs(collection(db, "area"));
      const data = querySnapshot.docs.map((doc) => ({
        stationId: doc.id,
        label: doc.data()?.name || "No Label",
        location: doc.data()?.location || "Non spécifié",
      }));
      setItems(data);
    };

    fetchBoxes();
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: insets.top },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.stationId}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/list-tab/stationpage/[stationId]",
                params: {
                  stationId: item.stationId,
                  label: item.label,
                  location: item.location,
                },
              })
            }
          >
            <View style={styles.box}>
              <Text style={styles.titleText}>{item.label}</Text>
              <Text style={styles.boxText}>Location : {item.location}</Text>
              <Text style={styles.boxText}>Global Rate : not already available</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/(tabs)/list-tab/addArea")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#B9A896",
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
  box: {
    backgroundColor: "#483C32",
    padding: 20,
    borderRadius: 10,
    maxWidth: "100%",
    width: 500,
    color: "#B9A896",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#65a765",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
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
  addText: {
    color: "white",
    display: "flex",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  text: {
    color: "#483C32",
    fontSize: 18,
  },
});

/* fonction pour calculer la moyenne des avis

async function getMoyenne(idarea: string) {
  try {
    const reviewRef = collection(db, "reviews");
    const q = query(reviewRef, where("idArea", "==", idarea));
    const snapshot = await getAggregateFromServer(q, {
      moyenne: average("globalRating"),
    });
    const moyenne = snapshot.data().moyenne;
    return moyenne;
  } catch (error) {
    console.log(error);
  }
}
Cette fonction retourne une promesse, et nous n'avons pas réussi à afficher la valeur de cette promesse dans l'application.
  */