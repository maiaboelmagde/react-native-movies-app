import { API_KEY } from "../secret";

const urlBase= 'https://api.themoviedb.org/3/movie/'

export const PopularURL = `${urlBase}popular?api_key=${API_KEY}`;
export const TopRatedURL = `${urlBase}top_rated?api_key=${API_KEY}`;
export const UpcomingURL = `${urlBase}upcoming?api_key=${API_KEY}`;


export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
