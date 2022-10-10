import { AxiosResponse } from "axios"
import { ReactNode } from "react"

export interface AuthProviderParams {
  children: ReactNode
}

export interface IUser {
  id: number
  email: string
  username: string
  updated_at: string
  inserted_at: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IRegisterData {
	email: string
  username: string
	password: string
	password_confirmation: string
}

export interface ContextData {
  authenticated: boolean
  user: IUser | null
  register(data: IRegisterData): Promise<AxiosResponse<any, any>>
  login(data: ILoginData): Promise<AxiosResponse<any, any>>
  logout(): Promise<void>
}
