import { AxiosResponse } from 'axios'
import { createContext, useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { AuthProviderParams, ContextData, ILoginData, IRegisterData, IUser } from '../types/contexts/authTypes'
import { api } from '../utils/api'

export const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthProvider({ children }: AuthProviderParams) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
  }, []);

  const register = async (data: IRegisterData): Promise<void> => {
    const res = await api.post("/login", data)
    
    localStorage.setItem('@App:user', JSON.stringify(res.data.user));
    localStorage.setItem('@App:token', res.data.token);
  }

  const login = async (data: ILoginData) => {
    try {
      const res = await api.post('/login', data)

      setUser(res.data.user)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      localStorage.setItem('@App:user', JSON.stringify(res.data.user))
      localStorage.setItem('@App:token', res.data.token)

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
      login,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}