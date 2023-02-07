import { useEffect, useState } from "react";
import {
  IAuthProvider,
  ILoginParams,
  IUserParams,
  IUser,
  TUser,
} from "../types/contexts/authTypes";
import { api } from "../utils/api";
import { AxiosResponse } from "axios";
import { AuthContext } from "../contexts/auth";

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<TUser>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    } else logout();
  }, []);

  const auth = async (token: string): Promise<void> => {
    await api
      .get("/auth/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const currentUser: IUser = res.data.data.user;

        setUser(currentUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        localStorage.setItem("@App:token", token);
        localStorage.setItem("@App:user", JSON.stringify(currentUser));
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  const logout = async (): Promise<void> => {
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  };

  const refreshUser = async (): Promise<void> => {
    await api
      .get("/auth/user")
      .then((res) => {
        const refreshedUser = res.data.data.user;

        setUser(refreshedUser);
        localStorage.setItem("@App:user", JSON.stringify(refreshedUser));
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  const register = async (
    params: IUserParams
  ): Promise<AxiosResponse<any, any>> => {
    return await api
      .post("/register", { user: params })
      .then(async () => await api.post("/login", { credentials: params }))
      .then(async (res) => {
        await auth(res.data.data.token);

        return res;
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  const login = async (
    params: ILoginParams
  ): Promise<AxiosResponse<any, any>> => {
    return await api
      .post("/login", { credentials: params })
      .then((res) => {
        auth(res.data.data.token);

        return res;
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  const updateUser = async (
    params: IUserParams
  ): Promise<AxiosResponse<any, any>> => {
    return await api
      .patch(`/user/${user?.id}`, { changes: params })
      .then(async (res) => {
        await refreshUser();

        return res;
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  const deleteUser = async (): Promise<AxiosResponse<any, any>> => {
    return await api
      .delete(`/user/${user?.id}`)
      .then((res) => {
        logout();

        return res;
      })
      .catch((err) => err.response as AxiosResponse<any, any>);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(user),
        user,
        register,
        login,
        logout,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
