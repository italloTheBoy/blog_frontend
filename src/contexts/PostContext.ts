import { createContext } from "react";
import { IPostContext } from "../types/contexts/PostContextTypes";

export const PostContext = createContext<IPostContext>({
  post: null,
  postAuthor: null,
  postMetrics: null,
  loadPost: async () => {},
  loadPostAuthor: async () => {},
  loadPostMetrics: async () => {},
});
