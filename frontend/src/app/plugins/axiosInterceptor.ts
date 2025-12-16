import axios from "axios";

export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        const oldToken = localStorage.getItem("auth_token");
        if (!oldToken) return Promise.reject(error);

        const refresh = await axios.post("/refresh", {}, {
          headers: { Authorization: `Bearer ${oldToken}` }
        });

        const newToken = refresh.data.token;

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        localStorage.setItem("auth_token", newToken);

        original.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(original);
      }

      return Promise.reject(error);
    }
  );
}
