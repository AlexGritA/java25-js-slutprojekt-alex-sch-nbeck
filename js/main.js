import { fetchTopRatedMovies, fetchPopularMovies, fetchMovieSearch, fetchPersonSearch } from "./api.js";
import { createMovieCard, createPersonCard } from "./ui.js"
import { sortItems } from "./sort.js"

//Get the search form element
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
form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Get values from form inputs
    const searchType = document.getElementById("search-type").value;
    const input = document.getElementById("search-input").value;
    const sortType = document.getElementById("sort-type").value;

    //Clear previous search results
    document.getElementById("search-container").innerHTML = "";

    //Hide top rated and popular sections when search is performed
    document.getElementById("top-rated-title").classList.add("hidden");
    document.getElementById("top-rated-container").classList.add("hidden");
    document.getElementById("popular-title").classList.add("hidden");
    document.getElementById("popular-container").classList.add("hidden");
    console.log("hidden added");

    
    if (searchType == "movie") {
        fetchMovieSearch(input).then(movies => {
            if (movies.length === 0) {
                //Show error if no results found
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                //Sort results before displaying
                const sorted = sortItems(movies, sortType);
                sorted.forEach(movie => createMovieCard(movie, "search-container", true));
            }
        }).catch(() => {
            //Show error on network or API failure
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    } else {
        fetchPersonSearch(input).then(persons => {
            if (persons.length === 0) {
                //Show error if no results found
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                //Sort results before displaying
                const sorted = sortItems(persons, sortType);
                sorted.forEach(person => createPersonCard(person, "search-container", true))
            }
        }).catch(() => {
            //Show error on network or API failure
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    }

    //Clear search input after submission
    document.getElementById("search-input").value = "";
});

//Reload page when title is clicked
document.getElementById("site-title").addEventListener("click", () => {
    location.reload();
});