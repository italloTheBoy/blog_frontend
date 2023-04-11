import { ReactNode } from "react";
import { IPost, ITimelineMetrics } from "../timelineTypes";
import { IUser } from "./authTypes";

type post = IPost | null;
type author = IUser | null;
type postMetrics = ITimelineMetrics | null;

export interface IPostContext {
  post: post;
  postAuthor: author;
  postMetrics: postMetrics;
  loadPost: () => Promise<void>;
  loadPostAuthor: () => Promise<void>;
  loadPostMetrics: () => Promise<void>;
}

export interface IPostProvider {
  children: ReactNode;
  postData: IPost;
}
