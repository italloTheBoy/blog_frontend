import { createContext } from "react";
import { IPostContext } from "../types/contexts/PostContextTypes";

export const PostContext = createContext<IPostContext>({
  post: null,
  postMetrics: null,
  loadPost: async () => {},
  loadPostMetrics: async () => {},
});
