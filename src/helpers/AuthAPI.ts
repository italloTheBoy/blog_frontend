import { TId } from "../types/appTypes";
import { IUser } from "../types/contexts/authTypes";
import { api } from "../utils/api";

export class AuthAPI {
  static async getUser(id: TId) {
    return await api.get<{ data: { user: IUser } }>(`/user/${id}`);
  }

  static async getCurrentUser() {
    return await api.get(`/auth/user`);
  }

  static async deleteUser(id: TId) {
    return await api.delete(`/user/${id}`);
  }
}
