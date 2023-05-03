import { ReactNode } from "react";
import { IComment, IPost, ITimelineMetrics } from "../timelineTypes";
import { IUser } from "./authTypes";

export interface IPostContext {
  post: IPost | null;
  postAuthor: IUser | null;
  postMetrics: ITimelineMetrics | null;
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
