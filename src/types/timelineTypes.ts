import { TId } from "./appTypes";

export type reactionType = "like" | "dislike";

export interface IPost {
  id: TId;
  user_id: TId;
  body: string;
}

export interface IPostParams {
  body?: string;
}

export interface IPostBody {
  post: IPostParams;
}

export interface IPostErrors {
  detail?: string;
  body?: string;
}

export interface IComment {
  id: TId;
  user_id: TId;
  posts_id: TId | undefined;
  comment_id: TId | undefined;
  body: string;
}

export interface ICommentParams {
  body?: string;
}

export interface ICommentBody {
  comment: ICommentParams;
}

export interface ICommentErrors {
  body?: string[];
}

export interface IReaction {
  id: TId;
  user_id: TId;
  type: reactionType;
}

export interface IPostReaction extends IReaction {
  post_id: TId;
}

export interface ICommentReaction extends IReaction {
  comment_id: TId;
}

export interface IReactionsMetrics {
  reactions: number;
  likes: number;
  dislikes: number;
}

export interface IReactionBody {
  reaction: {
    type: reactionType;
  };
}
