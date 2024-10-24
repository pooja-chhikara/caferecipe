import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

// Initialize Firebase Auth and Database
const auth = getAuth();
const database = getDatabase();

export default function SearchRecipe() {
  const [query, setQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  const fetchRecipe = async () => {
    const formattedQuery = query.replace(/ /g, '+');
    try {
      const recipeResponse = await fetch(`http://127.0.0.1:3000/scrape?query=${formattedQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (recipeResponse.ok) {
        const data = await recipeResponse.json();
        setRecipeData(data);
      } else {
        console.log("Recipe not loaded");
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const saveRecipeToRealtimeDatabase = async () => {
    try {
      if (!recipeData) {
        alert('Error', 'No recipe data to save');
        return;
      }

      const recipeName = recipeData.recipe_name;

      // Check if the recipe already exists in Realtime Database
      const recipeRef = ref(database, `recipes/${recipeName}`);
      const snapshot = await get(recipeRef);

      if (snapshot.exists()) {
        // If recipe already exists, show an alert
        alert('Recipe Already Exists', 'This recipe already exists in the database.');
        return;
      }

      // If recipe doesn't exist, save it
      await set(recipeRef, {
        name: recipeData.recipe_name,
        ingredients: recipeData.ingredients,
        directions: recipeData.directions,
        createdAt: new Date().toISOString(),
      });

      alert('Success', 'Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error', 'Failed to save the recipe. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Recipe Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search Recipe" onPress={fetchRecipe} />
      {recipeData && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>Recipe Name: {recipeData.recipe_name}</Text>
          <Text style={styles.subHeading}>Ingredients:</Text>
          {recipeData.ingredients?.map((ingredient, index) => (
            <Text key={index} style={styles.listItem}>- {ingredient}</Text>
          ))}
          <Text style={styles.subHeading}>Directions:</Text>
          {recipeData.directions?.map((direction, index) => (
            <Text key={index} style={styles.listItem}>Step {index + 1}: {direction}</Text>
          ))}

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <Button title="Save Recipe" onPress={saveRecipeToRealtimeDatabase} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  recipeContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  buttonContainer: {
    marginTop: 20,
    paddingVertical: 10,
  },
});
