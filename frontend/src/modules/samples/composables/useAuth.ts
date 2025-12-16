import { ref, computed } from 'vue'
import type { User } from '../models/User'
import { useApi } from './useApi'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../models/dto/AuthDTOs'


const user = ref<User | null>(
  JSON.parse(localStorage.getItem('auth_user') || 'null')
)

const token = ref<string | null>(
  localStorage.getItem('auth_token')
)

function clearSession() {
  user.value = null
  token.value = null
  localStorage.removeItem('auth_user')
  localStorage.removeItem('auth_token')
}


export function useAuth() {
  const api = useApi()

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  async function login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>('login', payload)
    user.value = data.user
    token.value = data.token

    localStorage.setItem('auth_user', JSON.stringify(data.user))
    localStorage.setItem('auth_token', data.token)
  }

  async function register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>('register', payload)

    user.value = data.user
    token.value = data.token

    localStorage.setItem('auth_user', JSON.stringify(data.user))
    localStorage.setItem('auth_token', data.token)
  }

  async function logout() {
    if (!token.value) {
      console.log(isAuthenticated.value)
      clearSession()
      return
    }

    try {
      await api.post('logout')
    } finally {
      clearSession()
    }
  }

  return {
    user,
    token,
    isAuthenticatedValue: isAuthenticated,
    login,
    register,
    logout,
  }
}
