import { Card, NavDropdown } from "react-bootstrap";
import { IPost } from "../../../types/timelineTypes";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { TUser } from "../../../types/contexts/authTypes";
import { ReactionButton } from "./ReactionButton";
import { TimelineAPI } from "../../../helpers/TimelineAPI";
import { useTimeline } from "../../../hooks/useTimeline";
import { CommentButton } from "./CommentButton";

interface TimelinePostProps {
  post: IPost;
}

export function TimelinePost(props: TimelinePostProps) {
  const { post } = props;

  const { loadPosts } = useTimeline();
  const [author, setAuthor] = useState<TUser>(undefined);

  const loadUser = async () => {
    await api
      .get(`/user/${post.user_id}`)
      .then((res) => setAuthor(res.data.data.user));
  };

  const handlePostDelete = async () => {
    await TimelineAPI.deletePost(post.id).then(() => loadPosts());
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Card as="article">
      <Card.Header as="header" className="d-flex justify-content-between pb-0">
        <Card.Title as="h2" className="fs-4">
          {author?.username}
        </Card.Title>

        {author?.id === post.user_id && (
          <NavDropdown as="nav" title="Opções " className="justify-content-end">
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
  );
}
