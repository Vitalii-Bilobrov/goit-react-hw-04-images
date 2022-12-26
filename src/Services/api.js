import axios from 'axios';

const API_KEY = '31492616-f7e5141788943e3bc0dbb552f';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const { data } = await axios.get(`${axios.defaults.baseURL}`, {
    params: {
      q: query,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};
