import { useRouter } from 'expo-router';
import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebaseConfig';

export default function AboutScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [pseudo, setPseudo] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const auth = getAuth();
  const router = useRouter();

  // Vérifie si un utilisateur est connecté
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPseudo(data.pseudo || '');
          setBirthDate(data.birthDate || '');
          setCountry(data.country || '');
          setIsProfileComplete(true);
        }
      }
    };

    fetchUserProfile();
  }, [user]);
  

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          Alert.alert('Connexion réussie', `Bienvenue, ${email}!`);
        })
        .catch((error) => {
          Alert.alert('Erreur', error.message);
        });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          Alert.alert('Inscription réussie', `Compte créé pour ${email}!`);
        })
        .catch((error) => {
          Alert.alert('Erreur', error.message);
        });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        Alert.alert('Déconnexion réussie', 'Vous êtes maintenant déconnecté.');
        setUser(null);
        setIsProfileComplete(false);
      })
      .catch((error) => {
        Alert.alert('Erreur', error.message);
      });
  };

  const handleSaveProfile = async () => {
    if (pseudo && birthDate && country){
      try {
        const userDoc = doc(db, 'users', user?.uid ||'');
        await setDoc(userDoc, {
          pseudo,
          birthDate,
          country,
        });
        setIsProfileComplete(true);
        Alert.alert('Profil mis à jour', 'vos informations ont été enregistrées');
      } catch (error) {
        Alert.alert('Erreur', 'Impossible d’enregistrer les informations')
      }
    } else {
      Alert.alert('Erreur', 'veuillez remplir tous les champs')
    }
  };

    // Si l'utilisateur est connecté, affiche les informations du compte
  if (user && !isProfileComplete) {
    return (
      <View style={styles.container}>
        <Text style = {styles.title}>Compléter votre profil</Text>
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          placeholderTextColor="#483C32"
          value={pseudo}
          onChangeText={setPseudo}
        />
        <TextInput
          style={styles.input}
          placeholder="Date de naissance (JJ/MM/AAAA)"
          placeholderTextColor="#483C32"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Pays"
          placeholderTextColor="#483C32"
          value={country}
          onChangeText={setCountry}
        />
        <Button title="Enregistrer" onPress={handleSaveProfile} color="#483C32" />
        <Button title="Se déconnecter" onPress={handleLogout} color="#483C32" />
      </View>
    );
  }

  if (user && isProfileComplete) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mon Compte</Text>
        <Text style={styles.info}>Email : {user.email}</Text>
        <Text style={styles.info}>Pseudo : {pseudo}</Text>
        <Text style={styles.info}>Date de naissance : {birthDate}</Text>
        <Text style={styles.info}>Pays : {country}</Text>
        <Button title="Se déconnecter" onPress={handleLogout} color="#483C32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Créer un compte' : 'Identifiez-vous'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#483C32"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#483C32"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isRegistering ? (
        <Button title="Créer un compte" onPress={handleRegister} color="#483C32" />
      ) : (
        <Button title="Se connecter" onPress={handleLogin} color="#483C32" />
      )}
      <Text
        style={styles.toggleText}
        onPress={() => setIsRegistering((prev) => !prev)}
      >
        {isRegistering ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Créez-en un'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9A896',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#483C32',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#483C32',
    borderWidth: 1,
    color: '#483C32',
  },
  toggleText: {
    marginTop: 15,
    color: '#483C32',
    textDecorationLine: 'underline',
  },
  info: {
    fontSize: 18,
    color: '#483C32',
    marginBottom: 10,
  },
});

