import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import 'react-native-gesture-handler';
import MoviesContextProvider from './context/MoviesContextProvider';

export default function App() {
  return (
    <MoviesContextProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </MoviesContextProvider>
    
  );
}
