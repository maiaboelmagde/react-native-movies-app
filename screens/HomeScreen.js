import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MoviesContext } from '../context/MoviesContextProvider';
import MovieCard from '../components/MovieCard';

export default function HomeScreen() {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    loading,
  } = useContext(MoviesContext);

  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [favourites, setFavourites]=useState([]);

  const getFilteredMovies = () => {
    switch (selectedCategory) {
      case 'popular':
        return popularMovies;
      case 'top_rated':
        return topRatedMovies;
      case 'upcoming':
        return upcomingMovies;
      default:
        return [];
    }
  };

  const filteredMovies = getFilteredMovies();

  const toggleFav = (movie)=>{
    exist = favourites.some((fav)=> fav.id === movie.id);
    if(exist){
        setFavourites(favourites.filter(fav=>fav.id !== movie.id));
    }else{
        setFavourites([...favourites,movie]);
    }
  }

   const isFavourite = (movieId) =>
    favourites.some((fav) => fav.id === movieId);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Movies" value="top_rated" />
        <Picker.Item label="Upcoming Movies" value="upcoming" />
      </Picker>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <MovieCard 
                movie={item} 
                isFavourite={isFavourite(item.id)} 
                onToggleFavourite = {toggleFav}
            ></MovieCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    marginBottom: 10,
  },
  movie: {
    fontSize: 16,
    padding: 8,
  },
});
