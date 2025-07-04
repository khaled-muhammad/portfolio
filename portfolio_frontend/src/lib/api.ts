import axios from 'axios';

export const defaultAxios = axios.create({
  baseURL: 'https://khaledmuhmmed99.pythonanywhere.comn/api/P/',
  timeout: 10000,
});