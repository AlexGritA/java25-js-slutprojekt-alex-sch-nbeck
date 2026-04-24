import { fetchTopRatedMovies, fetchPopularMovies, fetchMovieSearch, fetchPersonSearch } from "./api.js";
import { Movie } from "../models/Movie.js"
import { Person } from "../models/Person.js"
import { sortItems } from "./sort.js"

const form = document.getElementById("search-form");

fetchTopRatedMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("top-rated-container"));
});

fetchPopularMovies().then(movies => {
    movies.slice(0, 10).forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("popular-container"));
});

let currentResults = [];
let currentSearchType = "";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchType = document.getElementById("search-type").value;
    const input = document.getElementById("search-input").value;
    const sortType = document.getElementById("sort-type").value;

    document.getElementById("search-container").innerHTML = "";

    document.getElementById("top-rated-title").classList.add("hidden");
    document.getElementById("top-rated-container").classList.add("hidden");
    document.getElementById("popular-title").classList.add("hidden");
    document.getElementById("popular-container").classList.add("hidden");

    if (searchType == "movie") {
        fetchMovieSearch(input).then(movies => {
            currentResults = movies;
            currentSearchType = "movie";
            if (movies.length === 0) {
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                const sorted = sortItems(movies, sortType);
                sorted.forEach(movie => new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview).createCard("search-container"));
            }
        }).catch(() => {
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    } else {
        fetchPersonSearch(input).then(persons => {
            currentResults = persons;
            currentSearchType = "person";
            if (persons.length === 0) {
                document.getElementById("error-message").textContent = "No results found. Try a different search term.";
            } else {
                document.getElementById("error-message").textContent = "";
                const sorted = sortItems(persons, sortType);
                sorted.forEach(person => new Person(person.id, person.name, person.popularity, person.known_for_department, person.profile_path, person.known_for).createCard("search-container"));
            }
        }).catch(() => {
            document.getElementById("error-message").textContent = "Something went wrong. Please try again later.";
        });
    }

    document.getElementById("search-input").value = "";

    document.getElementById("back-btn").classList.remove("hidden");

    document.getElementById("back-btn").addEventListener("click", () => {
        location.reload();
    });
});

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

document.getElementById("site-title").addEventListener("click", () => {
    location.reload();
});

    document.querySelector('a[href="#popular-container"]').addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("search-container").innerHTML = "";
        document.getElementById("popular-title").classList.remove("hidden");
        document.getElementById("popular-container").classList.remove("hidden");
        document.getElementById("popular-container").scrollIntoView();
    });

    document.querySelector('a[href="#top-rated-container"]').addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("search-container").innerHTML = "";
        document.getElementById("top-rated-title").classList.remove("hidden");
        document.getElementById("top-rated-container").classList.remove("hidden");
        document.getElementById("top-rated-container").scrollIntoView();
    });