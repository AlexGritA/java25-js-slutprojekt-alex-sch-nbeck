import {fetchTopRatedMovies, fetchPopularMovies, fetchMovieSearch} from "./api.js";
import {createMovieCard} from "./ui.js"

const form = document.getElementById("search-form");

//Fetch top rated movies and display the first 10 as cards
fetchTopRatedMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => createMovieCard(movie, "top-rated-container"));
});

//Fetch most popular movies and display the first 10 as cards
fetchPopularMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => createMovieCard(movie, "popular-container"));
});

//Listen for form submission, prevent page reload and get search input value
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const input = document.getElementById("search-input").value;
    document.getElementById("search-container").innerHTML = "";
    fetchMovieSearch(input).then(movies => {
    movies.forEach(movie => createMovieCard(movie, "search-container"));
});
});
