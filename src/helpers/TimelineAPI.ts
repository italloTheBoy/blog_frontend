import { TId } from "../types/appTypes";
import { IPost, IPostBody, IReactionBody } from "../types/timelineTypes";
import { api } from "../utils/api";

export class TimelineAPI {
  static async createPost(body: IPostBody) {
    return await api.post(`/post`, body);
  }

  static async ListUserPosts(id: TId) {
    return await api.get(`/user/${id}/posts`);
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

  static async getPostReactionsMetrics(id: TId) {
    return await api.get(`/post/${id}/reactions/metrics`);
  }

  static async getCommentReactionsMetrics(id: TId) {
    return await api.get(`/comment/${id}/reactions/metrics`);
  }

  static async toggleReactionType(id: TId) {
    return await api.patch(`/reaction/${id}`);
  }

  static async deleteReaction(id: TId) {
    return await api.delete(`/reaction/${id}`);
  }
}
