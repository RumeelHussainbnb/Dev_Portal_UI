import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

const isServer = () => {
  return typeof window === 'undefined';
};

let accessToken = '';
let context = <GetServerSidePropsContext>{};
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken;
};

const getAccessToken = () => accessToken;

const getPublicKey = () =>
  localStorage.getItem('PublicKey') ? localStorage.getItem('PublicKey') : null;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
};

export const http = axios.create(options);

http.interceptors.request.use(config => {
  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  if (isServer() && context?.req?.cookies) {
    config.headers!.Cookie = `gid=${context.req.cookies.gid};`;
  }
  return config;
});

http.interceptors.response.use(
  response => {
    return response;
  },
  (error: any) => {
    // check conditions to refresh token
    if (error.response?.status === 400 && error.response?.data?.message === 'token is expire') {
      return refreshToken(error);
    }
    return Promise.reject(error);
  }
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach(callback => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (oError: AxiosError) => {
  try {
    const { response } = oError;

    // create new Promise to retry original request
    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber((token: string) => {
        response!.config.headers!['Authorization'] = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });

    // check whether refreshing token or not
    if (!fetchingToken) {
      fetchingToken = true;

      // refresh token
      const access_token = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        { PublicKey: getPublicKey() }
      );
      if (access_token?.data?.success == true) {
        let newToken = access_token?.data?.token;
        // check if this is server or not. We don't wanna save response token on server.

        if (!isServer()) {
          localStorage.setItem('userData', JSON.stringify(access_token?.data));
          setAccessToken(newToken);
        }
        // when new token arrives, retry old requests
        onAccessTokenFetched(newToken);
      }
    }
    return retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    if (!isServer() && !Router.asPath.includes('/library')) {
      Router.push('/library');
    }
    if (isServer()) {
      context.res.setHeader('location', '/library');
      context.res.statusCode = 302;
      context.res.end();
    }
    return Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};
