import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { IUser } from "../../../../types/contexts/authTypes";
import { AuthAPI } from "../../../../helpers/AuthAPI";

interface PerfilNavbarProps {
  user: IUser;
  authorization: boolean;
}

export function PerfilNavbar({ user, authorization }: PerfilNavbarProps) {
  const deleteUser = () => {
    AuthAPI.deleteUser(user.id);
  };

  return (
    <Navbar as="nav">
      <Container>
        <Navbar.Brand as="h1" className="fs-2">
          {user?.username}
        </Navbar.Brand>

        {authorization && (
          <NavDropdown as="nav" title="Opções " className="justify-content-end">
            <NavDropdown.Item href="/user/edit">Editar</NavDropdown.Item>
            <NavDropdown.Item onClick={deleteUser} className="text-danger">
              Deletar
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
}
