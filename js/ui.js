import { Movie } from "../models/Movie.js";
import { Person } from "../models/Person.js";
import { fetchPersonDetails, fetchMovieDetails } from "./api.js"


//Creates and displays a movie card with image, title, score, date, (overview)
export function createMovieCard(movie, containerId, showOverview = false) {

    const movieObj = new Movie(movie.id, movie.title, movie.release_date, movie.vote_average, movie.poster_path, movie.overview);

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



    //Adds Bootstrap classes to style card and image
    card.classList.add("card", "border-0", "movie-card");
    img.classList.add("w-100");

    //Adds element instances to card, then add card to container
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(score);
    card.appendChild(date);
    if (showOverview) {
        card.appendChild(overview);
    }
    
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

export function createPersonCard(person, containerId,) {

    const personObj = new Person(person.id, person.name, person.popularity, person.known_for_department, person.profile_path, person.known_for);

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

    card.classList.add("card", "border-0", "movie-card");
    img.classList.add("w-100");

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(popularity);
    card.appendChild(department);
    card.appendChild(workList);

    card.addEventListener("click", () => {
        fetchPersonDetails(personObj.id).then(details => {
            // Set modal title
            document.getElementById("modal-title").textContent = details.name;

            // Fill modal body with person details
            document.getElementById("modal-body").innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${details.profile_path}" class="mb-3">
            <p><strong>Birthday:</strong> ${details.birthday}</p>
            <p><strong>Place of birth:</strong> ${details.place_of_birth}</p>
            <p><strong>Department:</strong> ${details.known_for_department}</p>
            <p><strong>Biography:</strong> ${details.biography}</p>`;

            // Open the modal
            const modal = new bootstrap.Modal(document.getElementById("detail-modal"));
            modal.show();
        });
    });

    container.appendChild(card);
}