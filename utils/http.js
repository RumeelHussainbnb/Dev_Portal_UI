import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
};

const client = axios.create(options);

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    let key = '';
    let userData = {};
    if (typeof window !== 'undefined') {
      key = localStorage.getItem('PublicKey');
      userData = JSON.parse(localStorage.getItem('userData') || '{}');
    }
    // console.log('client.interceptors.request => ');
    // Do something before request is sent
    config.headers.Authorization = 'Bearer ' + userData.token;
    config.headers.PublicKey = key;
    //* To DO: Add 'Bearer ' + userData.token across application
    // config.headers.Authorization: 'Bearer ' + userData.token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
client.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 400 &&
      error.response?.data?.message === 'token is expire' &&
      !originalRequest._retry
    ) {
      //console.log('error interceptors Token Expired => ', error);
      originalRequest._retry = true;
      let newToken = '';
      const access_token = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        { PublicKey: key }
      );
      if (access_token?.data?.success == true) {
        // console.log('access_token?.data? =>  ', access_token?.data?.data);
        newToken = access_token?.data?.token;
        // console.log('newToken => ', newToken);
        localStorage.setItem('userData', JSON.stringify(access_token?.data));
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        // console.log('originalRequest 2 =>  ', originalRequest);
        //error.response.config.headers["Authorization"]= 'Bearer ' + newToken;
        //client.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      }
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default client;
