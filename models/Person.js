//Creates attributes to Person model
export class Person {
    constructor(name, popularity, known_for_department, profile_path, known_for) {
        this.name = name;
        this.popularity = popularity;
        this.known_for_department = known_for_department;
        this.profile_path = profile_path;
        this.known_for = known_for;
    }
}