import { TimelinePost } from "./TimelinePost";
import { useTimeline } from "../../../hooks/useTimeline";

export function Timeline() {
  const { posts } = useTimeline();

  return (
    <>
      {posts.length === 0 ? (
        <p>Não encontramos nemhuma postagem</p>
      ) : (
        posts.map((post) => <TimelinePost post={post} key={post.id} />)
      )}
    </>
  );
}
