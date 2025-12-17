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
            onRefreshed(newToken); // notifica todas as requisições pendentes
          } catch (err) {
            isRefreshing = false;
            return Promise.reject(err);
          }
        }

        // Espera o refresh terminar e aplica token atualizado
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            original.headers = {
              ...original.headers,
              Authorization: `Bearer ${token}`
            };
            resolve(axiosInstance(original));
          });
        });
      }

      return Promise.reject(error);
    }
  );
}
