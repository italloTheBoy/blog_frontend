import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export function PageHeader() {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <header>
            <Navbar.Brand href="/">Blog.ex</Navbar.Brand>
          </header>

          <Navbar.Toggle aria-controls="nav-menu" />
          <Navbar.Collapse id="nav-menu" className="justify-content-end">
            <Nav as="ul">
              <Nav.Item as="li" key="login">
                <Nav.Link href="/login">Entrar</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" key="register">
                <Nav.Link href="/register">Cadastrar-se</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}