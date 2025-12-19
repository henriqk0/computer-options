import axios, { type AxiosInstance } from "axios";


let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

export function setupAxiosInterceptors(axiosInstance: AxiosInstance = axios) {
  axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          const oldToken = localStorage.getItem("auth_token");
          if (!oldToken) {
            isRefreshing = false;
            return Promise.reject(error);
          }

          try {
            const refresh = await axiosInstance.post("/refresh", {}, {
              headers: { Authorization: `Bearer ${oldToken}` }
            });

            const newToken = refresh.data.token;
            localStorage.setItem("auth_token", newToken);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            isRefreshing = false;
            onRefreshed(newToken);
          } catch (err) {
            isRefreshing = false;
            return Promise.reject(err);
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(axiosInstance(original));
          });
        });
      }

      return Promise.reject(error);
    }
  );
}
