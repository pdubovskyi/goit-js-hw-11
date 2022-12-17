import axios from 'axios';

export default function getImage(image) {
  return axios
    .get(
      `https://pixabay.com/api/?key=32028713-8f4458935a933d773f83236cb&q=${image}&image_type=photoo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    )
    .then(renderImages);
}

// export default function country(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
