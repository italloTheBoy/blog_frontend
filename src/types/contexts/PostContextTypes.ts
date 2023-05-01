import { ReactNode } from "react";
import { IComment, IPost, ITimelineMetrics } from "../timelineTypes";
import { IUser } from "./authTypes";

type post = IPost | null;
type author = IUser | null;
type postMetrics = ITimelineMetrics | null;

export interface IPostContext {
  post: post;
  postAuthor: author;
  postMetrics: postMetrics;
  comments: IComment[];
  loadPost: () => Promise<void>;
  loadPostAuthor: () => Promise<void>;
  loadPostMetrics: () => Promise<void>;
  loadComments: () => Promise<void>;
}

export interface IPostProvider {
  children: ReactNode;
  postData: IPost;
}
