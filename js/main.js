import { fetchTopRatedMovies, fetchPopularMovies, fetchMovieSearch, fetchPersonSearch } from "./api.js";
import { Movie } from "../models/Movie.js"
import { Person } from "../models/Person.js"
import { sortItems } from "./sort.js"

//Get the search form element
const form = document.getElementById("search-form");

//Fetch top rated movies and display the first 10 as cards
fetchTopRatedMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("top-rated-container"));
});

//Fetch most popular movies and display the first 10 as cards
fetchPopularMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("popular-container"));
});

//Store latest search results for re-sorting
let currentResults = [];
let currentSearchType = "";

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

    if (searchType == "movie") {
        fetchMovieSearch(input).then(movies => {
            currentResults = movies;
            currentSearchType = "movie";
            if (movies.length === 0) {
                //Show error if no results found
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                //Sort results before displaying
                const sorted = sortItems(movies, sortType);
                sorted.forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("search-container"));
            }
        }).catch(() => {
            //Show error on network or API failure
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    } else {
        fetchPersonSearch(input).then(persons => {
            currentResults = persons;
            currentSearchType = "person";
            if (persons.length === 0) {
                //Show error if no results found
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                //Sort results before displaying
                const sorted = sortItems(persons, sortType);
                sorted.forEach(person => new Person(person.id, person.name, person.popularity, person.known_for_department, person.profile_path, person.known_for).createCard("search-container"));
            }
        }).catch(() => {
            //Show error on network or API failure
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    }

    //Clear search input after submission
    document.getElementById("search-input").value = "";

    //Show back button when search is performed
    document.getElementById("back-btn").classList.remove("hidden");

    //Reload page when back button is clicked
    document.getElementById("back-btn").addEventListener("click", () => {
        location.reload();
    });
});

//Re-sort and render results when sort type changes
document.getElementById("sort-type").addEventListener("change", function () {
    if (currentResults.length === 0) return;

    const sortType = document.getElementById("sort-type").value;
    const sorted = sortItems(currentResults, sortType);

    document.getElementById("search-container").innerHTML = "";
    if (currentSearchType === "movie") {
        sorted.forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("search-container"));
    } else {
        sorted.forEach(person => new Person(person.id, person.name, person.popularity, person.known_for_department, person.profile_path, person.known_for).createCard("search-container"));
    }
});

//Reload page when title is clicked
document.getElementById("site-title").addEventListener("click", () => {
    location.reload();
});

//Navigate to popular section and show it
    document.querySelector('a[href="#popular-container"]').addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("search-container").innerHTML = "";
        document.getElementById("popular-title").classList.remove("hidden");
        document.getElementById("popular-container").classList.remove("hidden");
        document.getElementById("popular-container").scrollIntoView();
    });

    //Navigate to top rated section and show it
    document.querySelector('a[href="#top-rated-container"]').addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("search-container").innerHTML = "";
        document.getElementById("top-rated-title").classList.remove("hidden");
        document.getElementById("top-rated-container").classList.remove("hidden");
        document.getElementById("top-rated-container").scrollIntoView();
    });