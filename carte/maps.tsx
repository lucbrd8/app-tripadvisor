import { GoogleMaps } from 'expo-maps';
import { StyleSheet } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEwWNt4nOn4NH1pvzG8cul5iflORmHpEc",
  authDomain: "tripadvisor-225e9.firebaseapp.com",
  projectId: "tripadvisor-225e9",
  storageBucket: "tripadvisor-225e9.firebasestorage.app",
  messagingSenderId: "978353746475",
  appId: "1:978353746475:web:79c2d233607b2dd61c706e",
  measurementId: "G-BK5XQMKR3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default function HomeScreen() {
  console.log(app)
  return (
    <GoogleMaps.View style={{ flex: 1 }} />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

// j'ajoute dans app.json : [
//        "expo-maps",
//        {
//          "requestLocationPermission": true,
//        "locationPermission": "Allow $(PRODUCT_NAME) to use your location"
//        }
//      ]