import {fetchTopRatedMovies, fetchPopularMovies} from "./api.js";
import {createMovieCard} from "./ui.js"

//Fetch top rated movies and display the first 10 as cards
fetchTopRatedMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => createMovieCard(movie, "top-rated-container"));
});

//Fetch most popular movies and display the first 10 as cards
fetchPopularMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => createMovieCard(movie, "popular-container"));
});