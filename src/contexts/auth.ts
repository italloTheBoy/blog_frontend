import { createContext } from "react";
import { IAuthContext } from "../types/contexts/authTypes";

export const AuthContext = createContext<IAuthContext>({});
