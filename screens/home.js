import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Write from './write';
import Search from './search';
import Recipe from './recipe';
import Icon from 'react-native-vector-icons/Ionicons'; 
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator initialRouteName="Search" 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Write') {
          iconName = focused ? 'pencil' : 'pencil-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Recipe') {
          iconName = focused ? 'list' : 'list-outline';
        }

        // Return the appropriate icon
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,  // Hide the header for all screens
    })}
    
    >
      <Tab.Screen name="Write" component={Write} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Recipe" component={Recipe} />
    </Tab.Navigator>
  );
};

export default Home;
