import { Card, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { PostForm } from "./PostForm";
import { Timeline } from "../../../layouts/timeline/Timeline";
import { TimelineProvier } from "../../../../provider/TimelineProvider";

export function Perfil() {
  const { user, deleteUser } = useAuth();

  return (
    <TimelineProvier font={{ type: "user", id: user!.id }}>
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

        <Timeline />
      </Container>
    </TimelineProvier>
  );
}
