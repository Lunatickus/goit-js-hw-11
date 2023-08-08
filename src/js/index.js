import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { SearchApiService } from "./search-api";


const refs = {
    searchForm: document.querySelector('.search-form'),
    formInput: document.querySelector('.form-input'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const searchApiService = new SearchApiService();


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
    }).catch(error => console.log(error));
}

function renderImageCard(images) {
    const { hits } = images;
    const markup = hits.map(( {webformatURL, largeImageURL, tags, likes, views, comments, downloads} ) => {
        return  `<div class="photo-card">
        <a href="${largeImageURL}" alt="${tags}" class="card-link">
            <img src="${webformatURL}" alt="${tags}" width="350" height="250" loading="lazy" />
            <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
            </div>
        </a>
      </div>`
    }).join('');

    refs.gallery.insertAdjacentHTML("beforeend", markup);

    const lightbox = new SimpleLightbox('.card-link');
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function showSuccessMessage({ total }) {
    if(total === 0) {
        throw new Error('invalid request');
    }

    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
    showLoadMoreBtn();
}

function showFailureMessage() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function showEndResultMessage({ total }) {
    const photoCardsOnPage = document.querySelectorAll('.photo-card');

    if(photoCardsOnPage.length === total) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        hideLoadMoreBtn();
    }
}

function hideLoadMoreBtn() {
    refs.loadMoreBtn.hidden = true;
}

function showLoadMoreBtn() {
    refs.loadMoreBtn.hidden = false;
}

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
}