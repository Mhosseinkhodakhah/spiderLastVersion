import axios from "axios";
import { getCookie, removeCookie } from "./cookie";

const token = () => {
  const token: string | undefined = getCookie("admin-token");

  if (token) {
    return token;
  }
};

console.log('its hereeee444', token())
const instance = axios.create({
  baseURL: 'http://gateway.spiderbot.ir',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const getToken = token();

    config.headers.Authorization = `Bearer ${getToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Handle specific error cases
    console.log(error);
    if (error.response) {
      // Server responded with a status code outside of 2xx
      switch (error.response.status) {
        case 401: {
          const UnauthorizedError = new Error("401");
          removeCookie("admin-token");
          window.location.replace("/signin");
          return Promise.reject(UnauthorizedError);
        }
        case 404: {
          const notFoundError = new Error("404");

          return Promise.reject(notFoundError);
        }
        case 400: {
          // const errorSource = new Error("400");
          // console.log(errorSource);

          return error.response;
        }
        case 500:
          {
            const serverError = new Error("500");

            return Promise.reject(serverError);
          }
          break;
        default: {
          const defaultError = new Error(
            `An error occurred: ${error.response.status}`
          );

          (defaultError as Error & { status?: number }).status =
            error.response.status;

          return Promise.reject(defaultError);
        }
      }
    } else if (error.request) {
      const networkError = new Error("No response");

      (networkError as Error & { status?: number }).status = 0;

      return Promise.reject(networkError);
    } else {
      // Error in setting up the request
      const setupError = new Error(error.message);

      (setupError as Error & { status?: number }).status = -1;

      return Promise.reject(setupError);
    }
  }
);

export default instance;
