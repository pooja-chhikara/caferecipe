import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';  // Import Firebase authentication

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle registration
  const handleRegister = () => {
    if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
    } else if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
    } else {
      // Firebase Authentication for registration
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          Alert.alert('Success', 'Registration successful!');
          navigation.navigate('Dashboard');
        })
        .catch((error) => {
          Alert.alert('Registration Error', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cafe Recipe</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />

      <View style={{ marginTop: 10 }}>
        <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
