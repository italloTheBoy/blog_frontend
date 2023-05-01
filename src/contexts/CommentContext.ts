import { createContext } from "react";
import { ICommentContext } from "../types/contexts/CommentContextTypes";

export const CommentContext = createContext<ICommentContext>({
  comment: null
});
