import { TimelinePost } from "./TimelinePost";
import { useTimeline } from "../../../hooks/useTimeline";
import { PostProvider } from "../../../provider/PostProvider";

export function Timeline() {
  const { posts } = useTimeline();

  return (
    <>
      {posts.length === 0 ? (
        <p>Não encontramos nemhuma postagem</p>
      ) : (
        posts.map((post) => (
          <PostProvider postId={post.id} key={post.id}>
            <TimelinePost post={post} />
          </PostProvider>
        ))
      )}
    </>
  );
}
