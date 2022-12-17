const axios = require('axios').default;

export default async function getImage(searchQuery, page, perPage) {
  const baseURL = 'https://pixabay.com/api/';
  const key = '32028713-8f4458935a933d773f83236cb';

  try {
    const response = await axios.get(
      `${baseURL}?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}
