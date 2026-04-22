import { Movie } from "../models/Movie.js";
import { Person } from "../models/Person.js";
import { fetchPersonDetails, fetchMovieDetails } from "./api.js"

//Creates and displays a movie card with image, title, score, date, (overview)
export function createMovieCard(movie, containerId, showOverview = false) {

    //Create Movie instance from raw TMDB data
    const movieObj = new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview);

    //Get container element where card will be added
    const container = document.getElementById(containerId);

    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = movieObj.title;

    const score = document.createElement("p");
    score.textContent = movieObj.vote_average;

    const date = document.createElement("p");
    date.textContent = movieObj.release_date;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;

    const overview = document.createElement("p");
    overview.textContent = movieObj.overview;

    //Add Bootstrap classes to style card and image
    card.classList.add("card", "border-0", "custom-card");
    img.classList.add("w-100");

    //Add element instances to card, then add card to container
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(score);
    card.appendChild(date);
    if (showOverview) {
        card.appendChild(overview);
    }

    //Open modal with detailed movie info when card is clicked
    card.addEventListener("click", () => {
        fetchMovieDetails(movieObj.id).then(details => {
            document.getElementById("modal-title").textContent = details.title;
            document.getElementById("modal-body").innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${details.poster_path}" class="mb-3">
            <p><strong>Release date:</strong> ${details.release_date}</p>
            <p><strong>Score:</strong> ${details.vote_average}</p>
            <p><strong>Overview:</strong> ${details.overview}</p>`;
            const modal = new bootstrap.Modal(document.getElementById("detail-modal"));
            modal.show();
        });
    });

    container.appendChild(card);
}

//Creates and displays a person card with image, name, popularity, department and known works
export function createPersonCard(person, containerId) {

    //Create Person instance from raw TMDB data
    const personObj = new Person(person.id, person.name, person.popularity, person.known_for_department, person.profile_path, person.known_for);

    //Get container element where card will be added
    const container = document.getElementById(containerId);

    const card = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = personObj.name;

    const popularity = document.createElement("p");
    popularity.textContent = personObj.popularity;

    const department = document.createElement("p");
    department.textContent = personObj.known_for_department;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${personObj.profile_path}`;

    //Create list of known works with Movie/TV labels
    const workList = document.createElement("ul");
    personObj.known_for.forEach(work => {
        const item = document.createElement("li");
        if (work.media_type === "movie") {
            item.textContent = `Movie: ${work.title}`;
        } else {
            item.textContent = `TV: ${work.name}`;
        }
        workList.appendChild(item);
    });

    //Add Bootstrap classes to style card and image
    card.classList.add("card", "border-0", "custom-card");
    img.classList.add("w-100");

    //Add element instances to card, then add card to container
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(popularity);
    card.appendChild(department);
    card.appendChild(workList);

    //Open modal with detailed person info when card is clicked
    card.addEventListener("click", () => {
        fetchPersonDetails(personObj.id).then(details => {
            document.getElementById("modal-title").textContent = details.name;
            document.getElementById("modal-body").innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${details.profile_path}" class="mb-3">
            <p><strong>Birthday:</strong> ${details.birthday}</p>
            <p><strong>Place of birth:</strong> ${details.place_of_birth}</p>
            <p><strong>Department:</strong> ${details.known_for_department}</p>
            <p><strong>Biography:</strong> ${details.biography}</p>`;
            const modal = new bootstrap.Modal(document.getElementById("detail-modal"));
            modal.show();
        });
    });

    container.appendChild(card);
}