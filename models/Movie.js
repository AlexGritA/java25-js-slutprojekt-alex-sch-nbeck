//Creates attributes to Movie model
export class Movie {
    constructor(id, title, release_date, vote_average, poster_path, overview) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.poster_path = poster_path;
        this.overview = overview;
    }
}