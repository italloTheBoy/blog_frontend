import { AxiosResponse } from 'axios'
import { createContext, useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { AuthProviderParams, ContextData, ILoginData, IRegisterData, IUpdateData, TUser } from '../types/contexts/authTypes'
import { api } from '../utils/api'

export const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthProvider({ children }: AuthProviderParams) {
  const [user, setUser] = useState<TUser>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
  }, []);

  const auth = (res: AxiosResponse<any, any>) => {
    setUser(res.data.user)
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

    localStorage.setItem('@App:user', JSON.stringify(res.data.user))
    localStorage.setItem('@App:token', res.data.token)
  }

  const register = async (data: IRegisterData) => {
    try {
      const res = await api.post('/users', data)

      auth(res)

      return res
    }
    catch (err: any) {
      return err.response as AxiosResponse<any, any>
    }
  }

  const update = async (data: IUpdateData) => {
    try {
      const res = await api.patch(
        `/users/${user?.id}`,
        { changes: data }
      )

      const updatedUser = {...user, ...data} as TUser

      setUser(updatedUser)
      localStorage.setItem('@App:user', JSON.stringify(updatedUser))

      return res
    }
    catch (err: any) {
      return await err.response as AxiosResponse<any, any>
    }
  }

  const login = async (data: ILoginData) => {
    try {
      const res = await api.post('/login', data)

      auth(res)

      return res
    }
    catch (err: any) {
      return err.response as AxiosResponse<any, any>
    }
  }

  const logout = async (): Promise<void> => {
    setUser(null)

    localStorage.removeItem('@App:user')
    localStorage.removeItem('@App:token')

    redirect('/')
  }

  return (
    <AuthContext.Provider value={{
      authenticated: Boolean(user),
      user,
      register,
      update,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}