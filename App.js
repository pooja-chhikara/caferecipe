import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens
import Dashboard from './screens/dashboard';
import Register from './screens/register';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
