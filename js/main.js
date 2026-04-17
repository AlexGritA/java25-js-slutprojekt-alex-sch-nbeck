import {fetchTopRatedMovies, fetchPopularMovies, fetchMovieSearch, fetchPersonSearch} from "./api.js";
import {createMovieCard, createPersonCard} from "./ui.js"

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

    const searchType = document.getElementById("search-type").value;
    const input = document.getElementById("search-input").value;
    document.getElementById("search-container").innerHTML = "";

    if(searchType == "movie") {
        fetchMovieSearch(input).then(movies => {
            movies.forEach(movie => createMovieCard(movie, "search-container", true));
        });
    } else {
        fetchPersonSearch(input).then(persons => {
            persons.forEach(person => createPersonCard(person, "search-container", true))
        });
    }    
    document.getElementById("search-input").value = "";
});
