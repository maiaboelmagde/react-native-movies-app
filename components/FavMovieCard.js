import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IMAGE_BASE_URL } from '../utils/config';


export default function FavMovieCard({ movie, isFavourite, onToggleFavourite }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <TouchableOpacity onPress={() => onToggleFavourite(movie)}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavourite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
});
