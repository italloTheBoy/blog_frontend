import { useEffect, useState } from "react";
import { IComment, IPost, ITimelineMetrics } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";
import { IPostProvider } from "../types/contexts/PostContextTypes";
import { PostContext } from "../contexts/PostContext";
import { IUser } from "../types/contexts/authTypes";
import { AuthAPI } from "../helpers/AuthAPI";

export function PostProvider({ children, postData }: IPostProvider) {
  const [post, setPost] = useState<IPost>(postData);
  const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
  const [postMetrics, setPostMetrics] = useState<ITimelineMetrics | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

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

  const loadComments = async () =>
    await TimelineAPI.ListPostComments(post.id).then((res) =>
      setComments(res.data.data.comments)
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
        comments,
        loadPost,
        loadPostAuthor,
        loadPostMetrics,
        loadComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
