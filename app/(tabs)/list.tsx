import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


interface Item {
    id: string,
    label?: string,
    cleanRating?: number,
    location?: string,
    globalRating?: number,
}

export default function AboutScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([])
  console.log("On render le component")
  useEffect(() => {
    const fetchBoxes = async () => {
        const querySnapshot = await getDocs(collection(db, 'area'));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            label: doc.data()?.name || 'No Label',
            cleanRating: doc.data()?.cleanRating || 0,
            location: doc.data()?.location || 'Non spécifié',
            globalRating: doc.data()?.globalRating || 'Non spécifié',
        }));
        console.log("On render le item", data);
        setItems(data);
    };

    fetchBoxes();
  }, []);
  
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => 
              router.push({
                pathname: '/details/[id]',
                params: {
                  id: item.id,
                  label: item.label,
                  cleanRating: item.cleanRating,
                  location: item.location,
                  globalRating: item.globalRating,
                },
              })
            }
          >
            <View style={styles.box}>
              <Text style={styles.titleText}>{item.label}</Text>
              <Text style={styles.boxText}>Lieu : {item.location}</Text>
              <Text style={styles.boxText}>Note globale : {item.globalRating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}  

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#B9A896',
  },
  scrollContainer: {
    flexDirection: 'column', // horizontal (default = column)
    justifyContent: 'space-between', // répartit horizontalement
    alignItems: 'center', // aligne verticalement
    padding: 20,
    gap: 15,
    backgroundColor: '#B9A896',
    paddingBottom: 100,
  },
  box: {
    backgroundColor: '#483C32',
    padding: 20,
    borderRadius: 10,
    maxWidth: '100%',
    width: 500,
    color: '#B9A896',
    fontWeight: 'bold',
  },
  titleText: {
    color: '#B9A896',
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 15,
  },
  boxText: {
    color: '#B9A896',
    fontWeight: 'bold',
  },
  text: {
    color: '#483C32',
    fontSize: 18,
  }
});
