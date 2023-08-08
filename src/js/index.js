import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { SearchApiService } from "./search-api";
import { renderImageCard } from "./render-markup";
import { showSuccessMessage, showFailureMessage, showEndResultMessage } from "./messages";
import { hideLoadMoreBtn, smoothScroll, hideLoadMoreBtn } from "./load-more-btn";


const refs = {
    searchForm: document.querySelector('.search-form'),
    formInput: document.querySelector('.form-input'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const searchApiService = new SearchApiService();

const lightbox = new SimpleLightbox('.card-link');


refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

hideLoadMoreBtn();

function onSearch(event) {
    event.preventDefault();

    if(!refs.formInput.value) {
        return;
    }

    searchApiService.query = refs.formInput.value;

    searchApiService.resetPage();
    hideLoadMoreBtn();
    clearGallery();

    searchApiService.fetchImages().then(({ data }) => {
        showSuccessMessage(data);
        renderImageCard(data);
        showEndResultMessage(data);
        lightbox.refresh();
    }).catch(error => {
        console.log(error);
        showFailureMessage();
    });
}

function onLoadMore() {
    if(!refs.formInput.value) {
        return;
    }

    searchApiService.query = refs.formInput.value;

    searchApiService.incrementPage();

    searchApiService.fetchImages().then(({ data }) => {
        renderImageCard(data);
        showEndResultMessage(data);
        smoothScroll();
        lightbox.refresh();
    }).catch(error => console.log(error));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

export { refs }