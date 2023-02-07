import { Card, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { PostForm } from "./PostForm";
import { useEffect, useState } from "react";
import { TimelineAPI } from "../../../../helpers/TimelineAPI";
import { Timeline } from "../../../layouts/timeline/Timeline";
import { IPost } from "../../../../types/timelineTypes";

export function Perfil() {
  const { user, deleteUser } = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    TimelineAPI.ListUserPosts(user!.id, setPosts);
  }, []);

  return (
    <Container className="m-auto w-75 p-2 d-grid gap-3">
      <Card>
        <Card.Header className="p-0">
          <Navbar>
            <Container>
              <Navbar.Brand as="h1" className="fs-2">
                {user?.username}
              </Navbar.Brand>
              <NavDropdown title="Opções " className="justify-content-end">
                <NavDropdown.Item href="/user/edit">Editar</NavDropdown.Item>
                <NavDropdown.Item onClick={deleteUser} className="text-danger">
                  Deletar
                </NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Navbar>
        </Card.Header>
        <Card.Body>
          <PostForm />
        </Card.Body>
      </Card>

      <Timeline posts={posts} />
    </Container>
  );
}
