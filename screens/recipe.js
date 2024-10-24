import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { database, ref, get, update, increment } from '../firebase';  // Firebase database imports

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch all recipes from Firebase Realtime Database
  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeRef = ref(database, 'recipes');
      const snapshot = await get(recipeRef);

      if (snapshot.exists()) {
        const recipeData = snapshot.val();
        const recipeList = Object.keys(recipeData).map(key => ({
          id: key,
          ...recipeData[key]
        }));
        setRecipes(recipeList);
      } else {
        console.log("No recipes found.");
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle like button click
  const handleLike = async (recipeId, currentLikes) => {
    const recipeRef = ref(database, `recipes/${recipeId}`);
    try {
      await update(recipeRef, { likes: increment(1) });
      setSelectedRecipe(prevRecipe => ({
        ...prevRecipe,
        likes: currentLikes + 1
      }));
    } catch (error) {
      console.error("Error liking the recipe:", error);
    }
  };

  // Function to share the recipe
  const handleShare = async (recipe) => {
    try {
      const message = `Check out this recipe!\n\nRecipe Name: ${recipe.name}\n\nIngredients: ${recipe.ingredients.join(', ')}\n\nDirections: ${recipe.directions.join(', ')}\n\nEnjoy your meal!`;

      const result = await Share.share({
        message: message,  // Message to share
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };

  // Render the list of recipes
  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => setSelectedRecipe(item)}
    >
      <Text style={styles.recipeName}>
        {item.name}{item.likes ? `(${item.likes} ❤️)` : '(0 ❤️)'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!selectedRecipe ? (
        <>
          <Text style={styles.title}>Recipes</Text>
          <FlatList
            data={recipes}
            keyExtractor={item => item.id}
            renderItem={renderRecipeItem}
          />
        </>
      ) : (
        <View style={styles.recipeDetailContainer}>
          <ScrollView style={styles.recipeDetailScroll}>
            <Text style={styles.recipeDetailTitle}>{selectedRecipe.name}</Text>
            <Text style={styles.subTitle}>Ingredients:</Text>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.textItem}>- {ingredient}</Text>
            ))}
            <Text style={styles.subTitle}>Directions:</Text>
            {selectedRecipe.directions.map((direction, index) => (
              <Text key={index} style={styles.textItem}>Step {index + 1}: {direction}</Text>
            ))}
          </ScrollView>

          {/* Fixed Buttons (Back, Like, Share) */}
          <View style={styles.fixedButtons}>
            <Button
              title="Back"
              onPress={() => setSelectedRecipe(null)}
              color="#4CAF50"
            />
            <Button
              title={`Like (${selectedRecipe.likes || 0})`}
              color="red"
              onPress={() => handleLike(selectedRecipe.id, selectedRecipe.likes || 0)}
            />
            <Button
              title="Share"
              color="blue"
              onPress={() => handleShare(selectedRecipe)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '500',
    flex:1,
    justifyContent:"space-between"
  },
  recipeDetailContainer: {
    flex: 1,
  },
  recipeDetailScroll: {
    flex: 1,
    marginBottom: 80,  // Space for the fixed buttons
  },
  recipeDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  fixedButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
