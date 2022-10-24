import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export function PageHeader() {
  const { authenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  const authNav = (
    <Nav as="ul">
      <Nav.Item as="li" key="username">
        <Nav.Link href="/user/perfil">{user?.username}</Nav.Link>
      </Nav.Item>

      <Nav.Item as="li" key="logout">
        <Nav.Link onClick={() => {logout(); navigate('/');}}>Sair</Nav.Link>
      </Nav.Item>
    </Nav>
  )

  const unAuthNav = (
    <Nav as="ul">
      <Nav.Item as="li" key="login">
        <Nav.Link href="/login">Entrar</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" key="register">
        <Nav.Link href="/register">Cadastrar-se</Nav.Link>
      </Nav.Item>
    </Nav>
  )

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
        <Container>
          <header>
            <Navbar.Brand href="/">Blog.ex</Navbar.Brand>
          </header>

          <Navbar.Toggle aria-controls="nav-menu" />
          <Navbar.Collapse id="nav-menu" className="justify-content-end">
            {authenticated ? authNav : unAuthNav}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}