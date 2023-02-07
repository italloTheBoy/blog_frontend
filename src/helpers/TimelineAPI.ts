import { TId } from "../types/appTypes";
import { IPost, IReactionBody } from "../types/timelineTypes";
import { api } from "../utils/api";

export class TimelineAPI {
  static async ListUserPosts(
    id: string | number,
    setCallback: React.Dispatch<React.SetStateAction<IPost[]>> = () => {}
  ) {
    await api
      .get(`/user/${id}/posts`)
      .then((res) => setCallback(res.data.data.posts));
  }

  static async deletePost(id: TId) {
    return await api.delete(`/post/${id}`);
  }

  static async reactPost(id: TId, body: IReactionBody) {
    return await api.post(`/post/${id}/reaction`, body);
  }

  static async getReaction(id: TId) {
    return await api.get(`/reaction/${id}`);
  }

  static async getReactionByPost(id: TId) {
    return await api.get(`/post/${id}/reaction`);
  }

  static async toggleReactionType(id: TId) {
    return await api.patch(`/reaction/${id}`);
  }
  
  static async deleteReaction(id: TId) {
    return await api.delete(`/reaction/${id}`);
  }
}
