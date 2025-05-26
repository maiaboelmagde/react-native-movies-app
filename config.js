import { API_KEY } from "./secret";

const urlRoot= 'https://api.themoviedb.org/3/movie/'

export const PopularURL = `${urlRoot}popular?api_key=${API_KEY}`;
export const TopRatedURL = `${urlRoot}top_rated?api_key=${API_KEY}`;
export const UpcomingURL = `${urlRoot}upcoming?api_key=${API_KEY}`;
