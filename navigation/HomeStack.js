import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false }} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: "Movie Details" }} />
    </Stack.Navigator>
  );
}
