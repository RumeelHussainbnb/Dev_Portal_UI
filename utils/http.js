import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
};

const client = axios.create(options);
let key = '';
if (typeof window !== 'undefined') {
  key = localStorage.getItem('PublicKey');
}

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = key;
    //* To DO: Add 'Bearer ' + userData.token across application
    // config.headers.Authorization: 'Bearer ' + userData.token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default client;
