import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MoviesContext } from '../context/MoviesContextProvider';
import MovieCard from '../components/MovieCard';
import { FavouritesContext } from '../context/FavouritesContextProvider';

export default function HomeScreen() {
  const {popularMovies, topRatedMovies, upcomingMovies, loading} = useContext(MoviesContext);
  const allMovies = [...topRatedMovies,...popularMovies, ...upcomingMovies];

  const { favouriteIds, addFavourite, removeFavourite } = useContext(FavouritesContext);

  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchText, setSearchText] = useState('');

  const getFilteredMovies = () => {
    let list = [];
    switch (selectedCategory) {
        case 'all_movies':
            list = allMovies;
            break
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
    const exist = favouriteIds.includes(movie.id);
    if(exist){
        removeFavourite(movie.id);
    }else{
        addFavourite(movie.id);
    }
  }

   const isFavourite = (movieId) => favouriteIds.includes(movieId);

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
                <Picker.Item label="All Movies" value="all_movies" />
                <Picker.Item label="Popular" value="popular" />
                <Picker.Item label="Top Movies" value="top_rated" />
                <Picker.Item label="Upcoming Movies" value="upcoming" />
            </Picker>
        </View>
      

        <FlatList
            data={filteredMovies}
            keyExtractor={(item,index) => (item.id+index).toString()}
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
