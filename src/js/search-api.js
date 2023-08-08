import axios from "axios";

const API_KEY = '38676991-eca9780ceec23f3471420f73e';

const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        return await axios.get(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}`);
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