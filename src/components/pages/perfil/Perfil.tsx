import {
  Card,
  Container,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";

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
        <Container>
          <Form className="d-grid gap-3 m-auto">
            <Form.Control placeholder="Insira um titulo"></Form.Control>
            <Form.Control type="text" as="textarea"></Form.Control>

            <Button className="mt-1 p-2" type="submit">
              Postar
            </Button>
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
}
