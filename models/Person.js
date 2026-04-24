import { fetchPersonDetails } from "../js/api.js";

export class Person {
    constructor(id, name, popularity, known_for_department, profile_path, known_for) {
        this.id = id;
        this.name = name;
        this.popularity = popularity;
        this.known_for_department = known_for_department;
        this.profile_path = profile_path;
        this.known_for = known_for;
    }

    createCard(containerId) {

        const container = document.getElementById(containerId);

        const card = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = this.name;

        const popularity = document.createElement("p");
        popularity.textContent = this.popularity;

        const department = document.createElement("p");
        department.textContent = this.known_for_department;

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${this.profile_path}`;

        const workList = document.createElement("ul");
        this.known_for.forEach(work => {
            const item = document.createElement("li");
            if (work.media_type === "movie") {
                item.textContent = `Movie: ${work.title}`;
            } else {
                item.textContent = `TV: ${work.name}`;
            }
            workList.appendChild(item);
        });

        card.classList.add("card", "border-0", "custom-card");
        img.classList.add("w-100");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(popularity);
        card.appendChild(department);
        card.appendChild(workList);

        card.addEventListener("click", () => {
            fetchPersonDetails(this.id).then(details => {
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
}