import { Card, NavDropdown } from "react-bootstrap";
import { useComment } from "../../../hooks/useComment";
import { Link } from "react-router-dom";
import { CommentButton } from "./CommentButton";
import { ReactionButton } from "./ReactionButton";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useAuth } from "../../../hooks/useAuth";
import { usePost } from "../../../hooks/usePost";
import { useEffect, useState } from "react";

export function TimelineComment() {
  const { comment, author, metrics, reloadMetrics } = useComment();
  const { user: currentUser } = useAuth();
  const { loadComments: reloadCommentList } = usePost();
  const [authorization, setAuthorization] = useState<boolean>(false);

  const handleDelete = async () => {
    await TimelineAPI.deleteComment(comment!.id).then(() => reloadCommentList!());
  };

  useEffect(() => {
    author && currentUser && author?.id === currentUser?.id
      ? setAuthorization(true)
      : setAuthorization(false);
  }, [author]);

  return (
    comment && (
      <Card as="article">
        <Card.Header
          as="header"
          className="d-flex justify-content-between pb-0"
        >
          <Card.Title as="h2" className="fs-4">
            <Link
              to={`/perfil/${author?.id}`}
              className="text-decoration-none text-dark"
            >
              {author?.username}
            </Link>
          </Card.Title>
          {authorization && (
            <NavDropdown
              as="nav"
              title="Opções "
              className="justify-content-end"
            >
              <NavDropdown.Item className="text-danger" onClick={handleDelete}>
                Deletar
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Card.Header>

        <Card.Body as="main">
          <Card.Text>{comment.body}</Card.Text>
        </Card.Body>

        <Card.Footer as="nav" className="border-0 pt-0">
          <ReactionButton
            reactableType="comment"
            reactable={comment}
            metrics={metrics!}
            metricsLoader={reloadMetrics!}
          />
          <CommentButton
            commentableType="comment"
            commentable={comment}
            metrics={metrics!}
            metricsLoader={reloadMetrics!}
          />
          <Card.Link href={`/comment/${comment.id}`}>Veja mais...</Card.Link>
        </Card.Footer>
      </Card>
    )
  );
}
