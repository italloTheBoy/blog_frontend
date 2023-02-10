import { useEffect, useState } from "react";
import { TimelineContext } from "../contexts/TimelineContext";
import { ITimelineProvider } from "../types/contexts/TimelineContextTypes";
import { IPost } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";

export function TimelineProvier(props: ITimelineProvider) {
  const { children, font } = props;
  const [posts, setPosts] = useState<IPost[]>([]);

  const loadUserPosts = async (): Promise<void> => {
    await TimelineAPI.ListUserPosts(font.id).then((res) =>
      setPosts(res.data.data.posts)
    );
  };

  const loadPosts = async (): Promise<void> => {
    if (font.type === "user") await loadUserPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <TimelineContext.Provider value={{ posts, loadPosts }}>
      {children}
    </TimelineContext.Provider>
  );
}
