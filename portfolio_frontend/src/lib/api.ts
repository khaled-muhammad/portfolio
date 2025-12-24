import axios from 'axios';

export const defaultAxios = axios.create({
  baseURL: 'https://khaledmuhmmed99.pythonanywhere.com/api/P/',
  timeout: 10000,
});