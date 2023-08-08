import axios from "axios";

const API_KEY = '38676991-eca9780ceec23f3471420f73e';

const BASE_URL = "https://pixabay.com/api/";

class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const params = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
            page: this.page,
        });

        return await axios.get(`${BASE_URL}?${params}`);
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

export { SearchApiService };