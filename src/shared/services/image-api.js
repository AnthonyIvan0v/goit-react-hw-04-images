import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '33597829-87cd9965b8bd2b0dbe6a17920',
    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  const { hits } = data;
  return hits;
};
