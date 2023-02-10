import { ReactNode } from "react";
import { TId } from "../appTypes";
import { IPost } from "../timelineTypes";

type PostFont = {
  type: "user";
  id: TId;
};

export interface ITimelineContext {
  posts: IPost[];
  loadPosts: () => Promise<void>;
}

export interface ITimelineProvider {
  children: ReactNode;
  font: PostFont;
}
