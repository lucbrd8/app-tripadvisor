// app/details/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function DetailScreen() {
  const { id, label, globalRating, cleanRating, location, isShower, staffRating, showerRate } = useLocalSearchParams();
  
  let shower: string = 'Non spécifié';

  if (isShower == 'false') {
    shower = 'Yes';
  } else {
    shower = 'No';
  }
    

  return (
    <View style={styles.container}>
      <Stack.Screen
      options={{
        title: 'Détails',
        headerStyle: {
          backgroundColor: '#483C32',
        },
        headerTintColor: '#B9A896',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
      <Text style={styles.text}>Name : {label}</Text>
      <Text style={styles.text}>Global Rate : {globalRating}</Text>
      <Text style={styles.text}>Localisation : {location}</Text>
      <Text style={styles.text}>Staff Rate : {staffRating}</Text> 
      <Text style={styles.text}>Cleaning Rate : {cleanRating}</Text>
      <Text style={styles.text}>Shower ? : {shower}</Text>
      <Text style={styles.text}>Shower Rate : {showerRate}</Text>
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