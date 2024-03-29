import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Login } from "../../pages/auth/Login";
import { Register } from "../../pages/auth/Register";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/statusCode/NotFound";
import { Perfil } from "../../pages/user/perfil/Perfil";
import { PageHeader } from "./PageHeader";
import { UpdateUser } from "../../pages/user/UpdateUser";
import { PostPage } from "../../pages/post_page/PostPage";

export function PageLayout() {
  const { authenticated } = useAuth();

  const authRoutes = (
    <>
      <Route path="perfil" element={<Perfil />} />
      <Route path="user/edit" element={<UpdateUser />} />
    </>
  );

  const unAuthRoutes = (
    <>
      <Route path="" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </>
  );

  return (
    <BrowserRouter>
      <PageHeader />
      <Container>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="error/notfound" element={<NotFound />} />
          <Route path="perfil/:id" element={<Perfil />} />
          <Route path="post/:id" element={<PostPage />} />

          {authenticated ? authRoutes : unAuthRoutes}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
