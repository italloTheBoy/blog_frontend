import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Login } from "../../pages/auth/Login";
import { Register } from "../../pages/auth/Register";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/statusCode/NotFound";
import { EditUser } from "../../pages/user/update/EditUser";
import { Perfil } from "../../pages/user/Perfil";
import { PageHeader } from "./PageHeader";

export function PageLayout() {
  const { authenticated } = useAuth()

  const authRoutes = (
    <>
      <Route path="" element={<Perfil />} />
      <Route path="user/perfil" element={<Perfil />} />
      <Route path="user/edit" element={<EditUser />} />
    </>
  )

  const unAuthRoutes = (
    <>
      <Route path="" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </>
  )

  return (
    <BrowserRouter>
      <PageHeader />
      <Container>
        <Routes>
          <Route path="*" element={<NotFound />} />

          {authenticated ? authRoutes : unAuthRoutes}
        </Routes>
      </Container>
    </BrowserRouter>
  )
} 