import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  const [items, setItems] = useState([])
 
  useEffect(() => {
    const fetchBoxes = async () => {
        const querySnapshot = await getDocs(collection(db, 'boxes'));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            label: doc.data().label,
        }));
        setItems(data);
    };

    fetchBoxes();
  }, []);
  
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item) => (
            <View key={item.id} style={styles.box}>
                <Text style={styles.boxText}>{item.label}</Text>
            </View>
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
    alignItems: 'center',
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
