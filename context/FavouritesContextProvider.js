import React, { createContext, useReducer, useEffect } from 'react';
import FavReducer from '../reducers/FavReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavRedTypes from '../utils/FavRedTypes';

export const FavouritesContext = createContext();

const STORAGE_KEY = 'favourite_movie_ids';

export default function FavouritesContextProvider({ children }) {
  const initialState = { favouriteIds: [] };
  const [favourites, dispatchFavourites] = useReducer(FavReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (data) {
          dispatchFavourites({
            type: FavRedTypes.LOAD_FAVOURITES,
            payload: JSON.parse(data),
          });
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites.favouriteIds)).catch(console.error);
  }, [favourites.favouriteIds]);

  const addFavourite = (movieId) => {
    dispatchFavourites({ type: FavRedTypes.ADD_FAVOURITE, payload: movieId });
  };

  const removeFavourite = (movieId) => {
    dispatchFavourites({ type: FavRedTypes.REMOVE_FAVOURITE, payload: movieId });
  };

  console.log('Current Favourites:', favourites);

  return (
    <FavouritesContext.Provider
      value={{
        favouriteIds: favourites.favouriteIds,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
