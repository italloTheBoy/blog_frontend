import { ReactNode } from "react"
import { InferType } from "yup"
import { loginSchema } from "../../schemas/loginSchema"

export interface AuthProviderParams {
  children: ReactNode
}

export type TLoginData = InferType<typeof loginSchema>

export interface RegisterData {
  username: string
	email: string,
	password: string,
	password_confirmation: string,
}


export interface ContextData {
  authenticated: boolean,
  user: object | null
  register(data: RegisterData): Promise<void>,
  login(data: TLoginData): Promise<void>,
  logout(): Promise<void>,
}
