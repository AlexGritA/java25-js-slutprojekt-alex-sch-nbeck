//Creates and displays a movie card with image, title, score, date
export function createMovieCard(movie, containerId) {

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

    card.classList.add("card", "border-0", "movie-card");
    img.classList.add("w-100");
    
    //Adds element instances to card, then add card to container
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(score);
    card.appendChild(date);
    
    container.appendChild(card);
}