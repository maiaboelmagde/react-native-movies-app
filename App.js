import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import 'react-native-gesture-handler';
import MoviesContextProvider from './context/MoviesContextProvider';
import FavouritesContextProvider, { FavouritesContext } from './context/FavouritesContextProvider';

export default function App() {
  return (
    <MoviesContextProvider>
      <FavouritesContextProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </FavouritesContextProvider>
    </MoviesContextProvider>
    
  );
}
