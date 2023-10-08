import axios, { AxiosInstance } from "axios";
import store from "@Store/configureStore";

const HOST = "http://192.168.15.137";

const mainApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3333`,
});

mainApi.interceptors.request.use((config) => {
  const { token } = store.getState().auth;

  if (token) config.headers.Authorization = `Bearer ${token.value}`;

  return config;
});

const authApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3330`,
});

export { mainApi, authApi };
