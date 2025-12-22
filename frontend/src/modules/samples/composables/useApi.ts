import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { setupAxiosInterceptors } from '@/app/plugins/axiosInterceptor'


const baseUrl = import.meta.env.VITE_BASE_API_URL as string

let api: AxiosInstance | null = null

function createApi(): AxiosInstance {
  const instance = axios.create({
    baseURL: baseUrl,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers = new AxiosHeaders(config.headers).set('Authorization', `Bearer ${token}`);
    }

    return config
  })

  setupAxiosInterceptors(instance)

  return instance
}

export function useApi() {
  if (!api) {
    api = createApi()
  }

  function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api!.get<T>(url, config)
  }

  function post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api!.post<T>(url, data, config)
  }

  function put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api!.put<T>(url, data, config)
  }

  function del<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api!.delete<T>(url, config)
  }

  return { get, post, put, del }
}
