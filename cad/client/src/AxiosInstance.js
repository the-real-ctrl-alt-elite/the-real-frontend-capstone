import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.API_BASE_URL}${process.env.CAMPUS_CODE}`,
  headers: {
    Authorization: process.env.GIT_TOKEN,
  },
});

export default axiosInstance;
