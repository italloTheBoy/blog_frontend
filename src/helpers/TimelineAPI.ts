import { TId } from "../types/appTypes";
import { ICommentBody, IPostBody, IReactionBody } from "../types/timelineTypes";
import { api } from "../utils/api";

export class TimelineAPI {
  static async createPost(body: IPostBody) {
    return await api.post(`/post`, body);
  }

  static async commentAnPost(postId: TId, body: ICommentBody) {
    return await api.post(`/post/${postId}/comment`, body);
  }

  static async commentAnComment(commentId: TId, body: ICommentBody) {
    return await api.post(`/comment/${commentId}/comment`, body);
  }

  static async reactPost(id: TId, body: IReactionBody) {
    return await api.post(`/post/${id}/reaction`, body);
  }

  static async getPost(id: TId) {
    return await api.get(`/post/${id}`);
  }

  static async getReaction(id: TId) {
    return await api.get(`/reaction/${id}`);
  }

  static async getReactionByPost(id: TId) {
    return await api.get(`/post/${id}/reaction`);
  }

  static async getPostMetrics(id: TId) {
    return await api.get(`/post/${id}/metrics`);
  }

  static async getCommentMetrics(id: TId) {
    return await api.get(`/comment/${id}/metrics`);
  }

  static async ListUserPosts(id: TId) {
    return await api.get(`/user/${id}/posts`);
  }

  static async toggleReactionType(id: TId) {
    return await api.patch(`/reaction/${id}`);
  }

  static async deletePost(id: TId) {
    return await api.delete(`/post/${id}`);
  }

  static async deleteReaction(id: TId) {
    return await api.delete(`/reaction/${id}`);
  }
}
