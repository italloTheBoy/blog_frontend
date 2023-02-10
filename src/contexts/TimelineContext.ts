import { createContext } from "react";
import { ITimelineContext } from "../types/contexts/TimelineContextTypes";

export const TimelineContext = createContext<ITimelineContext>({
  posts: [],
  loadPosts: async () => {}
});
