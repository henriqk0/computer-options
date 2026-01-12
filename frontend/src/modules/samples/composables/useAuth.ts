import { ref, computed } from 'vue'
import { useApi } from './useApi'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../models/dto/AuthDTOs'
import type { UserWithRole } from '../models/UserWithRole'


const user = ref<UserWithRole | null>(
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

  function hasAuthorization(role: string): boolean {
    if (!isAuthenticated.value) return false;

    const roleMap = new Map([
      ['user', 1],
      ['editor', 2],
      ['admin', 3],
    ])
    const requiredRole = roleMap.get(role);
    const userRole = roleMap.get(user.value!.role);

    if (requiredRole === undefined || userRole === undefined) return false;

    if (requiredRole > userRole) return false;

    return true;
  }

  const requiresAdmin = computed(() => hasAuthorization('admin'));
  const requiresEditor = computed(() => hasAuthorization('editor'));

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
    hasAuthorization,
    requiresAdmin: requiresAdmin,
    requiresEditor: requiresEditor
  }
}
