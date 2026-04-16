//API key used to authenticate requests to TMDB
const API_KEY = "8a86b570858b5a22294b6e5fe4b85a34";
//Base URL for all TMDB API endpoints (avoids repeating full URL)
const BASE_URL = "https://api.themoviedb.org/3";

//Fetch top rated movie, convert response to json to read data
export function fetchTopRatedMovies() {
    fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
        console.log("Top rated movies:", data)
        });
}

//fetch popular mvies, convert response to json to read data
export function fetchPopularMovies() {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log("Popular movies:", data)
        });
}