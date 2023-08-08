import { refs } from ".";

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

export {hideLoadMoreBtn, showLoadMoreBtn, smoothScroll};