import type { User } from "../User";


export interface AuthResponse {
  token: string;
  user: User;
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
