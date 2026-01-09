import type { UserWithRole } from "../UserWithRole";


export interface AuthResponse {
  token: string;
  user: UserWithRole;
  message?: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}


export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}
