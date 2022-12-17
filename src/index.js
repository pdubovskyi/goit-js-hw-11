import Notiflix from 'notiflix';
import './css/styles.css';
const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ------------------DOM Elements---------------------

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const inputEl = document.querySelector('input[name="searchQuery"]');

console.log(galleryEl);
console.log(formEl);

let perPage = 40;
let page = 0;
let searchQuery;
loadBtn.style.display = 'none';

// --------------------------formEl------------------

formEl.addEventListener('submit', onFormEl);

function onFormEl(event) {
  event.preventDefault();
  searchQuery = formEl.elements.searchQuery.value;
  galleryEl.innerHTML = '';
  loadBtn.style.display = 'none';
  page = 1;

  getImage(searchQuery, page, perPage)
    .then(searchQuery => {
      console.log(searchQuery);
      let totalPages = searchQuery.data.totalHits / perPage;
      // console.log(totalPages);
      if (searchQuery.data.hits.length > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${searchQuery.totalhits} images.`
        );
        renderImages(searchQuery);
        loadBtn.style.display = 'block';

        if (page < totalPages) {
          loadBtn.style.display = 'block';
        } else {
          loadBtn.style.display = 'none';
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        galleryEl.innerHTML = '';
      }
    })
    .catch(error => console.log('ERROR: ' + error));
}

// ---------------------------HTTP request---------------------

function getImage(searchQuery, page, perPage) {
  return axios
    .get(
      `https://pixabay.com/api/?key=32028713-8f4458935a933d773f83236cb&q=${searchQuery}&image_type=photoo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    )
    .then(responce => {
      // console.log(responce);
      return responce;
    })
    .catch(error => {
      console.log('ERROR: ' + error);
    });
}

// function getImage(searchQuery, page, perPage) {
//   return axios
//     .get(
//       `https://pixabay.com/api/?key=32028713-8f4458935a933d773f83236cb&q=${searchQuery}&image_type=photoo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//     )
//     .then(renderImages);
// }

// --------------------------------Gellery Images------------------

function renderImages(images) {
  const arrays = images.data.hits;

  const markup = arrays
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL} class="gallery-link">
        <div class="photo-card">
    <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span class="quantity">${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span class="quantity">${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span class="quantity">${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span class="quantity">${downloads}</span>
      </p>
    </div>
  </div>
        </a>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

// -------------------------onLoadBtn-------------------

loadBtn.addEventListener('click', onLoadBtn);

function onLoadBtn(e) {
  let name = inputEl.value;
  console.log(name);
  page += 1;

  getImage(name, page, perPage)
    .then(name => {
      let totalPages = name.data.totalHits / perPage;
      console.log(name.data.hits);
      renderImages(name);
      console.log(renderImages(name));

      if (page >= totalPages) {
        loadBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log('ERROR: ' + error));
}
