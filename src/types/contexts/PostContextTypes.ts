import { ReactNode } from "react";
import { TId } from "../appTypes";
import { IPost } from "../timelineTypes";

type post = IPost | null 

export interface IPostContext {
  post: post;
  loadPost: () => Promise<void>;
}

export interface IPostProvider {
  children: ReactNode;
  postId: TId;
}
