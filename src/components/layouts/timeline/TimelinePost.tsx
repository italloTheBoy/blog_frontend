import { Card, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { ReactionButton } from "./ReactionButton";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useTimeline } from "../../../hooks/useTimeline";
import { CommentButton } from "./CommentButton";
import { usePost } from "../../../hooks/usePost";
import { useAuth } from "../../../hooks/useAuth";
import { IUser } from "../../../types/contexts/authTypes";

export function TimelinePost() {
  const { post } = usePost();
  const { user: currentUser } = useAuth();
  const { loadPosts } = useTimeline();
  const [author, setAuthor] = useState<IUser | null>(null);
  const [authorization, setAuthorization] = useState<boolean>(false);

  const loadAuthor = async () => {
    await api
      .get(`/user/${post!.user_id}`)
      .then((res) => setAuthor(res.data.data.user));
  };

  const handlePostDelete = async () => {
    await TimelineAPI.deletePost(post!.id).then(() => loadPosts());
  };

  useEffect(() => {
    loadAuthor();
  }, []);

  useEffect(() => {
    author?.id === currentUser?.id
      ? setAuthorization(true)
      : setAuthorization(false);
  }, [author]);

  return (
    post && (
      <Card as="article">
        <Card.Header
          as="header"
          className="d-flex justify-content-between pb-0"
        >
          <Card.Title as="h2" className="fs-4">
            {author?.username}
          </Card.Title>

          {authorization && (
            <NavDropdown
              as="nav"
              title="Opções "
              className="justify-content-end"
            >
              <NavDropdown.Item
                className="text-danger"
                onClick={handlePostDelete}
              >
                Deletar
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Card.Header>

        <Card.Body as="main">
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>

        <Card.Footer as="nav" className="border-0 pt-0">
          <ReactionButton />
          <CommentButton />
        </Card.Footer>
      </Card>
    )
  );
}
