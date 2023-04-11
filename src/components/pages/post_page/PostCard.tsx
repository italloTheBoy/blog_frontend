import { Card } from "react-bootstrap";
import { usePost } from "../../../hooks/usePost";
import { useEffect } from "react";
import { ReactionButton } from "../../layouts/timeline/ReactionButton";

export function PostCard() {
  const { post, postAuthor, loadPostAuthor } = usePost();

  useEffect(() => {
    loadPostAuthor()
  }, []) 

  return (
    <Card.Body>
      <Card.Title as="header">
        <h1 className="fs-3">{postAuthor?.username}</h1>
      </Card.Title>
      <Card.Text>{post!.body}</Card.Text>
      <nav>
        <ReactionButton />
      </nav>
    </Card.Body>
  );
}
