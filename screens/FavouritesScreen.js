import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import FavMovieCard from '../components/FavMovieCard';
import { MoviesContext } from '../context/MoviesContextProvider';
import { FavouritesContext } from '../context/FavouritesContextProvider';
import { FlatList } from 'react-native-gesture-handler';

export default function FavouritesScreen() {

    const { favouriteIds, addFavourite, removeFavourite } = useContext(FavouritesContext);
    const { popularMovies, topRatedMovies, upcomingMovies } = useContext(MoviesContext);

    const allMovies = [...popularMovies, ...topRatedMovies, ...upcomingMovies];

    const favouriteMovies = allMovies.filter(movie => favouriteIds.includes(movie.id));

    const isFavourite = (movieId) => favouriteIds.includes(movieId);

    const toggleFav = (movie) => {
        const exist = favouriteIds.includes(movie.id);
        if (exist) {
            removeFavourite(movie.id);
        } else {
            addFavourite(movie.id);
        }
    };

    return (
        <View>
            <FlatList
                data={favouriteMovies}
                keyExtractor={(item, index) => (item.id + index).toString()}
                renderItem={({ item }) => (
                    <FavMovieCard
                        movie={item}
                        isFavourite={isFavourite(item.id)}
                        onToggleFavourite={toggleFav}
                    ></FavMovieCard>
                )}
            />
        </View>
    )
}