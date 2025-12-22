import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";


const baseUrl = import.meta.env.VITE_BASE_API_URL as string

const refreshApi = axios.create({
  baseURL: baseUrl,
})

let refreshPromise: Promise<string> | null = null

function refreshToken(): Promise<string> {
  if (!refreshPromise) {
    const oldToken = localStorage.getItem("auth_token")

    if (!oldToken) {
      return Promise.reject(new Error("No token to refresh"))
    }

    refreshPromise = refreshApi.post("/refresh", {}, {
      headers: {
        Authorization: `Bearer ${oldToken}`
      }
    }).then(res => {
      const newToken = res.data.token
      localStorage.setItem("auth_token", newToken)
      return newToken
    }).finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

export function setupAxiosInterceptors(axiosInstance: AxiosInstance = axios) {
  axiosInstance.interceptors.response.use(
    res => res,
    async (error) => {
      const original = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !original._retry &&  !original.url?.includes("/refresh")) {
        original._retry = true;

        const newToken = await refreshToken()

        original.headers = {
          ...original.headers,
          Authorization: `Bearer ${newToken}`
        }

        return axiosInstance(original)
      }

      return Promise.reject(error);
    }
  );
}
