import { AxiosResponse } from "axios";
import { ReactNode } from "react";

export type TUser = IUser | null | undefined; 

export interface IAuthProvider {
  children: ReactNode;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IUserParams {
  email?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
}

export interface IAuthContext {
  authenticated?: boolean;
  user?: TUser;
  register?: (params: IUserParams) => Promise<AxiosResponse<any, any>>;
  login?: (params: ILoginParams) => Promise<AxiosResponse<any, any>>;
  logout?: () => Promise<void>;
  updateUser?: (params: IUserParams) => Promise<AxiosResponse<any, any>>;
  deleteUser?: () => Promise<AxiosResponse<any, any>>;
}


