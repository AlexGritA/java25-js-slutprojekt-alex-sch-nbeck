//Creates and displays a movie card with image, title, score, date, (overview)
export function createMovieCard(movie, containerId, showOverview = false) {

    const container = document.getElementById(containerId);
    
    const card = document.createElement("div");
    
    const title = document.createElement("h3");
    title.textContent = movie.title;
    
    const score = document.createElement("p");
    score.textContent = movie.vote_average;
    
    const date = document.createElement("p");
    date.textContent = movie.release_date;
    
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const overview = document.createElement("p");
    overview.textContent = movie.overview;


    
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

    container.appendChild(card);
}

export function createPersonCard(person, containerId,) {

    const container = document.getElementById(containerId);
    
    const card = document.createElement("div");
    
    const name = document.createElement("h3");
    name.textContent = person.name;
    
    const popularity = document.createElement("p");
    popularity.textContent = person.popularity;
    
    const department = document.createElement("p");
    department.textContent = person.known_for_department;
    
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${person.profile_path}`;

    const workList = document.createElement("ul");

    person.known_for.forEach(work => {
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

    container.appendChild(card);
}