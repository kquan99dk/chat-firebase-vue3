import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/admin",
  timeout: 30000,
  responseType: "json",
});

http.interceptors.request.use(
  (config: any) => {
    config["header"] = {
      testtttttttttt: "testtttttttttt",
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
