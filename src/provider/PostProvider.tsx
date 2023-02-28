import { useEffect, useState } from "react";
import { IPost } from "../types/timelineTypes";
import { TimelineAPI } from "../helpers/TimelineAPI";
import { IPostProvider } from "../types/contexts/PostContextTypes";
import { PostContext } from "../contexts/PostContext";

export function PostProvider(props: IPostProvider) {
  const { children, postId } = props;
  const [post, setPost] = useState<IPost | null>(null);

  const loadPost = async () =>
    await TimelineAPI.getPost(postId).then((res) =>
      setPost(res.data.data.post)
    );

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <PostContext.Provider value={{ post, loadPost }}>
      {children}
    </PostContext.Provider>
  );
}
