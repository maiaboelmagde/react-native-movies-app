import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FavMovieCard from '../components/FavMovieCard';
import { MoviesContext } from '../context/MoviesContextProvider';
import { FavouritesContext } from '../context/FavouritesContextProvider';
import { FlatList } from 'react-native-gesture-handler';

export default function FavouritesScreen() {

    const { favouriteIds, addFavourite, removeFavourite } = useContext(FavouritesContext);
    const { popularMovies, topRatedMovies, upcomingMovies } = useContext(MoviesContext);

    const movieMap = new Map();
    [...popularMovies, ...topRatedMovies, ...upcomingMovies].forEach((movie) => {
        movieMap.set(movie.id, movie);
    });

    const allMovies = Array.from(movieMap.values()); //UNIQUE Movies

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
        <View style={styles.container}>
            {favouriteMovies.length == 0 ?
                (
                    <View style={styles.emptyContainer}>
                        <Image
                            source={require('../assets/fav.png')}
                            style={styles.emptyImage}
                        />
                        <Text style={styles.emptyText}>No favourites yet</Text>
                        <Text style={styles.emptyText}>Favourites Movies would be shown here</Text>

                    </View>
                )
                :
                (
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
                )
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height:'100%'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});