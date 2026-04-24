export function sortItems(items, sortType) {
    if (sortType === "az") {
        return items.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
    } else if (sortType === "za") {
        return items.sort((a, b) => (b.title || b.name).localeCompare(a.title || a.name));
    } else if (sortType === "score-asc") {
        return items.sort((a, b) => (a.vote_average || a.popularity) - (b.vote_average || b.popularity));
    } else if (sortType === "score-desc") {
        return items.sort((a, b) => (b.vote_average || b.popularity) - (a.vote_average || a.popularity));
    }
    return items;
}