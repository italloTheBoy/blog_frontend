import { Card } from "react-bootstrap";
import { usePost } from "../../../hooks/usePost";
import { useEffect } from "react";
import { ReactionButton } from "../../layouts/timeline/ReactionButton";
import { useAuth } from "../../../hooks/useAuth";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useNavigate } from "react-router-dom";
import { PostOptionsNav } from "./PostOptionsNav";

export function PostCard() {
  const { post, postAuthor, loadPostAuthor, postMetrics, loadPostMetrics } =
    usePost();
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
        {isAuthor && <PostOptionsNav handleDelete={handleDelete} />}
      </Card.Title>
      <Card.Text>{post!.body}</Card.Text>
      <nav>
        <ReactionButton
          reactableType="post"
          reactable={post!}
          metrics={postMetrics}
          metricsLoader={loadPostMetrics}
        />
      </nav>
    </Card.Body>
  );
}
