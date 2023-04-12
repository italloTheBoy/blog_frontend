import { Card, NavDropdown } from "react-bootstrap";
import { usePost } from "../../../hooks/usePost";
import { useEffect } from "react";
import { ReactionButton } from "../../layouts/timeline/ReactionButton";
import { useAuth } from "../../../hooks/useAuth";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useNavigate } from "react-router-dom";
import { PostNav } from "./PostNav";

export function PostCard() {
  console.log(1)
  const { post, postAuthor, loadPostAuthor } = usePost();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAuthor = user !== null && user?.id === postAuthor?.id;

  const handleDelete = async () => {
    await TimelineAPI.deletePost(post!.id).then(() =>
      navigate(`/perfil/${postAuthor!.id}`)
    );
  };

  useEffect(() => {
    loadPostAuthor();
  }, []);

  return (
    <Card.Body>
      <Card.Title as="header" className="d-flex">
        <h1 className="fs-3 flex-grow-1">
          <Card.Link
            href={`/perfil/${postAuthor?.id}` || "#"}
            className="text-decoration-none"
          >
            {postAuthor?.username}
          </Card.Link>
        </h1>
        {isAuthor && (
          <PostNav handleDelete={handleDelete} />
        )}
      </Card.Title>
      <Card.Text>{post!.body}</Card.Text>
      <nav>
        <ReactionButton />
      </nav>
    </Card.Body>
  );
}
