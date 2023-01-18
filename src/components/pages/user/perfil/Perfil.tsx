import { Card, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";
import { PostForm } from "./PostForm";

export function Perfil() {
  const { user, deleteUser } = useAuth();

  return (
    <Card className="m-auto w-75 p-2">
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
  );
}
