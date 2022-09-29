import { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthProviderParams, ContextData, LoginData, RegisterData } from '../types/contexts/authTypes';
import { api } from '../utils/api'

export const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthProvider({ children }: AuthProviderParams) {
  const [user, setUser] = useState<object | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
  }, []);

  const register = async (data: RegisterData): Promise<void> => {
    const res = await api.post("/login", data)
    
    localStorage.setItem('@App:user', JSON.stringify(res.data.user));
    localStorage.setItem('@App:token', res.data.token);
  }

  const login = async (data: LoginData): Promise<void> => {
    const res = await api.post("/login", data)
    
    localStorage.setItem('@App:user', JSON.stringify(res.data.user));
    localStorage.setItem('@App:token', res.data.token);
  }

  const logout = async (): Promise<void> => {
    setUser(null)

    localStorage.removeItem('@App:user')
    localStorage.removeItem('@App:token')
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