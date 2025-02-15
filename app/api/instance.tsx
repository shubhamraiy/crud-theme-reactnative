import axios from "axios";
import { BASE_URL } from "./list";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (request: any) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
