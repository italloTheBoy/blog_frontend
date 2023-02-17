import { Badge, Card, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { PostForm } from "./PostForm";
import { Timeline } from "../../../layouts/timeline/Timeline";
import { TimelineProvier } from "../../../../provider/TimelineProvider";

export function Perfil() {
  const { user, deleteUser } = useAuth();

  return (
    <TimelineProvier font={{ type: "user", id: user!.id }}>
      <Container as="main" className="m-auto w-75 p-2 d-grid gap-3">
        <Card as="header">
          <Card.Header as="header" className="p-0">
            <Navbar as="nav">
              <Container>
                <Navbar.Brand as="h1" className="fs-2">
                  {user?.username}
                </Navbar.Brand>

                <NavDropdown as="nav" title="Opções " className="justify-content-end">
                  <NavDropdown.Item href="/user/edit">Editar</NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={deleteUser}
                    className="text-danger"
                  >
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

        <Container as="main" className="p-0 d-grid gap-3">
          <Timeline />
        </Container>
      </Container>
    </TimelineProvier>
  );
}
