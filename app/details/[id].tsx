// app/details/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen() {
  const { id, label, cleanRating, location, globalRating } = useLocalSearchParams();
  const { id, label, globalRating, cleanRating, location, isShower } = useLocalSearchParams();
  
  let shower: string = 'Non spécifié';

  if (isShower == 'false') {
    shower = 'Yes';
  } else {
    shower = 'No';
  }
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails</Text>
      <Text style={styles.text}>Nom : {label}</Text>
      <Text style={styles.text}>Note : {globalRating}</Text>
      <Text style={styles.text}>Lieu : {location}</Text>
      <Text style={styles.text}>Note globale : {globalRating}</Text>
      <Text style={styles.text}>Shower ? : {shower}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#B9A896',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#483C32',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#483C32',
  },
});
