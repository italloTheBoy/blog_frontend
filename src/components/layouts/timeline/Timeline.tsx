import { Container } from "react-bootstrap";
import { IPost } from "../../../types/timelineTypes";
import { TimelinePost } from "./TimelinePost";

interface TimelineProps {
  posts?: IPost[];
}

export function Timeline(props: TimelineProps) {
  const { posts = [] } = props;

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
