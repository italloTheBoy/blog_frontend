import { useEffect, useState } from "react";
import { IPost, ITimelineMetrics } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";
import { IPostProvider } from "../types/contexts/PostContextTypes";
import { PostContext } from "../contexts/PostContext";

export function PostProvider({ children, postData }: IPostProvider) {
  const [post, setPost] = useState<IPost>(postData);
  const [postMetrics, setPostMetrics] = useState<ITimelineMetrics | null>(null);

  const loadPost = async () =>
    await TimelineAPI.getPost(post.id).then((res) =>
      setPost(res.data.data.post)
    );

  const loadPostMetrics = async () =>
    await TimelineAPI.getPostMetrics(post.id).then((res) =>
      setPostMetrics(res.data.data)
    );

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <PostContext.Provider
      value={{ post, postMetrics, loadPost, loadPostMetrics }}
    >
      {children}
    </PostContext.Provider>
  );
}
