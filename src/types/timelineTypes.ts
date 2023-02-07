import { TId } from "./appTypes";

export type reactionType = "like" | "dislike";

export interface IPost {
  id: TId;
  user_id: string | number;
  title: string;
  body: string;
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

export interface IPostErrors {
  detail?: string;
  title?: string;
  body?: string;
}

export interface IReactionBody {
  reaction: {
    type: reactionType;
  };
}
