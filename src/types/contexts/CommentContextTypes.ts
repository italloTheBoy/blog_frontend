import { ReactNode } from "react";
import { IComment, ITimelineMetrics } from "../timelineTypes";
import { IUser } from "./authTypes";
import { TId } from "../appTypes";

export interface ICommentContext {
  comment: IComment | null;
  author?: IUser;
  metrics?: ITimelineMetrics;
  reloadComment?: () => Promise<void>;
  reloadAuthor?: () => Promise<void>;
  reloadMetrics?: () => Promise<void>;
}

export interface ICommentProvider {
  children: ReactNode;
  commentData?: IComment;
  commentId?: TId;
  loadAuthor?: boolean;
  loadMetrics?: boolean
}
