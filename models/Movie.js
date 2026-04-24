import { fetchMovieDetails } from "../js/api.js";

export class Movie {
    constructor(id, title, release_date, vote_average, poster_path, overview) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.poster_path = poster_path;
        this.overview = overview;
    }

    createCard(containerId, showOverview = false) {

        const container = document.getElementById(containerId);

        const card = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = this.title;

        const score = document.createElement("p");
        score.textContent = this.vote_average;

        const date = document.createElement("p");
        date.textContent = this.release_date;

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${this.poster_path}`;

        const overview = document.createElement("p");
        overview.textContent = this.overview;

        card.classList.add("card", "border-0", "custom-card");
        img.classList.add("w-100");

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(score);
        card.appendChild(date);
        if (showOverview) {
            card.appendChild(overview);
        }

        card.addEventListener("click", () => {
            fetchMovieDetails(this.id).then(details => {
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
}