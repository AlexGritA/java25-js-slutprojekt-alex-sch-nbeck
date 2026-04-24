const API_KEY = "8a86b570858b5a22294b6e5fe4b85a34";

const BASE_URL = "https://api.themoviedb.org/3";

export function fetchTopRatedMovies() {
    return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.results);
}

export function fetchPopularMovies() {
    return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.results);
}

export function fetchMovieSearch(query) {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(response => response.json())
    .then(data => data.results);
}
export function fetchPersonSearch(query) {
    return fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`)
    .then(response => response.json())
    .then(data => data.results);
}

export function fetchMovieDetails(id) {
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(response => response.json())
}

export function fetchPersonDetails(id) {
    return fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`)
    .then(response => response.json())
}