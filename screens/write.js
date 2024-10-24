import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { ref, set } from 'firebase/database';  // Firebase Realtime Database methods
import { database } from '../firebase';  // Import the Firebase database

const Write = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');

  // Function to save the recipe
  const saveRecipe = () => {
    if (name.trim() === '' || ingredients.trim() === '' || directions.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const ingredientsList = ingredients.split(',').map(item => item.trim());  // Convert ingredients to a list
    const directionsList = directions.split(',').map(item => item.trim());  // Convert directions to a list

    // Save the recipe to Firebase Realtime Database
    set(ref(database, `recipes/${name}`), {
      name: name,
      ingredients: ingredientsList,
      directions: directionsList,
    })
    .then(() => {
      alert('Success', 'Recipe saved successfully!');
      setName('');  // Clear the input fields
      setIngredients('');
      setDirections('');
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>Cafe Recipe - Write</Text>

      {/* Input for Recipe Name */}
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Input for Ingredients */}
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChangeText={(text) => setIngredients(text)}
        multiline
        numberOfLines={10}
      />

      {/* Input for Directions */}
      <TextInput
        style={styles.input}
        placeholder="Directions (comma-separated)"
        value={directions}
        multiline
        numberOfLines={10}
        onChangeText={(text) => setDirections(text)}
      />

      {/* Save Button */}
      <Button title="Save Recipe" onPress={saveRecipe} />
    </View>
  );
};

export default Write;

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
