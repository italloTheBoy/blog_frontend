import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Login } from "../../pages/auth/Login";
import { Register } from "../../pages/auth/Register";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/statusCode/NotFound";
import { PageHeader } from "./PageHeader";

export function PageLayout() {
  const { authenticated } = useAuth()
  
  const authRoutes = (
    <>
    </>
  )

  const unAuthRoutes = (
    <>

      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </>
  )

  return (
    <BrowserRouter>
      <PageHeader />
      <Container as="main">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="" element={<Home />} />

          { authenticated ? authRoutes : unAuthRoutes }
        </Routes>
      </Container>
    </BrowserRouter>
  )
} 