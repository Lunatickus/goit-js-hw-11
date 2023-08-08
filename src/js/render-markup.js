import { refs } from ".";

function renderImageCard({ hits }) {
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
}

export { renderImageCard };