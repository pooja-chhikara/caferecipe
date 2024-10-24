import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';  // Import Firebase authentication

const Dashboard = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = () => {
    if (email.trim() === '') {
      alert('Invalid Email', 'Please enter a valid email.');
    } else if (password.length < 6) {
      alert('Invalid Password', 'Password must be at least 6 characters long.');
    } else {
      // Firebase Authentication for login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert('Login Successful', `Welcome back, ${userCredential.user.email}`);
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert('Login Error', error.message);
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

      <Button title="Login" onPress={handleLogin} />

      <View style={{ marginTop: 10 }}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

export default Dashboard;

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
