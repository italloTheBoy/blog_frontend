import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth";

export function PerfilNavbar() {
  const { user, deleteUser } = useAuth();

  return (
    <Navbar as="nav">
      <Container>
        <Navbar.Brand as="h1" className="fs-2">
          {user?.username}
        </Navbar.Brand>

        <NavDropdown as="nav" title="Opções " className="justify-content-end">
          <NavDropdown.Item href="/user/edit">Editar</NavDropdown.Item>
          <NavDropdown.Item onClick={deleteUser} className="text-danger">
            Deletar
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
