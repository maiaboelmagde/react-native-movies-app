import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
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
  const [favourites, setFavourites] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getFilteredMovies = () => {
    let list = [];
    switch (selectedCategory) {
      case 'popular':
        list = popularMovies;
        break;
      case 'top_rated':
        list = topRatedMovies;
        break;
      case 'upcoming':
        list = upcomingMovies;
        break;
    }
    return list.filter((movie)=>{
        return movie.title.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const filteredMovies = getFilteredMovies();

  const toggleFav = (movie)=>{
    const exist = favourites.some((fav)=> fav.id === movie.id);
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

        <View style={styles.inputPart}>
            <TextInput 
                placeholder='Search for a movie' 
                style={styles.textInput}
                onChangeText={setSearchText}
                value={searchText}
            ></TextInput>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Popular" value="popular" />
                <Picker.Item label="Top Movies" value="top_rated" />
                <Picker.Item label="Upcoming Movies" value="upcoming" />
            </Picker>
        </View>
      

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
  inputPart:{
    flexDirection:'row',
    gap:5,
    marginBottom:10
  },
  textInput: {
    flex: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  picker: {
    flex: 1,
  },

  movie: {
    fontSize: 16,
    padding: 8,
  },
});
