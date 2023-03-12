import { ReactNode } from "react";
import { IPost, ITimelineMetrics } from "../timelineTypes";

type post = IPost | null;
type postMetrics = ITimelineMetrics | null;

export interface IPostContext {
  post: post;
  postMetrics: postMetrics;
  loadPost: () => Promise<void>;
  loadPostMetrics: () => Promise<void>;
}

export interface IPostProvider {
  children: ReactNode;
  postData: IPost;
}
