import { ReactNode } from "react";
import { IComment, ITimelineMetrics } from "../timelineTypes";
import { IUser } from "./authTypes";
import { TId } from "../appTypes";

export interface ICommentContext {
  comment: IComment | null;
  commentAuthor?: IUser;
  commentMetrics?: ITimelineMetrics;
  reloadComment?: () => Promise<void>;
  reloadCommentAuthor?: () => Promise<void>;
  reloadCommentMetrics?: () => Promise<void>;
}

export interface ICommentProvider {
  children: ReactNode;
  commentData?: IComment;
  commentId?: TId;
  loadAuthor?: boolean;
  loadMetrics?: boolean
}
