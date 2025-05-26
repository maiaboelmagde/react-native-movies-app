import { View, Text } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import { PopularURL, TopRatedURL, UpcomingURL } from '../config';

export const MoviesContext = createContext();

export default function MoviesContextProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async (url, setState) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setState(data.results || []);
      } catch (e) {
        console.error('Error loading movies:', e);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        loadMovies(PopularURL, setPopularMovies),
        loadMovies(TopRatedURL, setTopRatedMovies),
        loadMovies(UpcomingURL, setUpcomingMovies),
      ]);
      console.log(topRatedMovies);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        loading,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
