import axios from 'axios';

export function fetchItems(name, page) {
  const API_KEY = '30146257-64982587d71520e4d5095fa16';
  return axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
}
