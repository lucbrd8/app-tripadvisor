import { Image } from 'expo-image';
import { StyleSheet, TextInput, View } from 'react-native';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Prévenir l'automatisation du masquage de l'écran de démarrage
SplashScreen.preventAutoHideAsync();

// Importation des images
const PlaceholderImage = require('@/assets/images/image_sans_fond.png');
const PlaceholderImage2 = require('@/assets/images/image_plan.png');

export default function Index() {
  useEffect(() => {
    // Fonction pour cacher l'écran de démarrage après un délai de 5 secondes
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []); // L'effet se déclenche une seule fois lors du montage du composant

  return (
    <View style={styles.container}>
      {/* Image de la carte */}
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage2} style={styles.image2} />
      </View>

      {/* Champ de recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher..."
        placeholderTextColor="#B9A896"
      />

      {/* Logo */}
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
    </View>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9A896',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  image2: {
    width: 400,
    height: 400,
    borderRadius: 0,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#483C32',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "#483C32",
    color: '#ccc',
  },
});