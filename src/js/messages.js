import Notiflix from "notiflix";
import { showLoadMoreBtn, hideLoadMoreBtn } from "./load-more-btn";

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

export { showSuccessMessage, showFailureMessage, showEndResultMessage };