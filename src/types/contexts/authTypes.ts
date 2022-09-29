import { ReactNode } from "react"

export interface AuthProviderParams {
  children: ReactNode
}

export interface RegisterData {
  username: string
	email: string,
	password: string,
	password_confirmation: string,
}

export interface LoginData {
  email: string,
	password: string,
}

export interface ContextData {
  authenticated: boolean,
  user: object | null
  register(data: RegisterData): Promise<void>,
  login(data: LoginData): Promise<void>,
  logout(): Promise<void>,
}
