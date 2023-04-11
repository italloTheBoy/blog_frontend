import { useEffect, useState } from "react";
import { IPost, ITimelineMetrics } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";
import { IPostProvider } from "../types/contexts/PostContextTypes";
import { PostContext } from "../contexts/PostContext";
import { IUser } from "../types/contexts/authTypes";
import { AuthAPI } from "../helpers/AuthAPI";

export function PostProvider({ children, postData }: IPostProvider) {
  const [post, setPost] = useState<IPost>(postData);
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
  const [postMetrics, setPostMetrics] = useState<ITimelineMetrics | null>(null);

  const loadPost = async () =>
    await TimelineAPI.getPost(post.id).then((res) =>
      setPost(res.data.data.post)
    );

  const loadPostAuthor = async () =>
    await AuthAPI.getUser(post.user_id).then((res) =>
      setPostAuthor(res.data.data.user)
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
      value={{
        post,
        postAuthor,
        postMetrics,
        loadPost,
        loadPostAuthor,
        loadPostMetrics,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
