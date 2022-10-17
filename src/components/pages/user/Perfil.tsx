import { Card, Container, ListGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../../../hooks/useAuth'

export function Perfil() {
  const { user } = useAuth()

  return (
    <Card border="primary" className="m-auto w-75 p-2">
      <Card.Header className="p-0">
        <Navbar>
          <Container>
            <Navbar.Brand as="h1" className="fs-2">
              {user?.username}
            </Navbar.Brand>

            <NavDropdown title="Opções " className="justify-content-end">
              <NavDropdown.Item href="/user/edit">Editar</NavDropdown.Item>
              <NavDropdown.Item href="#" className="text-danger">Deletar</NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
      </Card.Header>

      <Card.Body>

      </Card.Body>
    </Card>
  )
}