import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { IUserParams } from "../../../types/contexts/authTypes";
import { IUserFormErrors } from "../../../types/errorsTypes";

export function UpdateUser() {
  const [errs, setErrs] = useState<IUserFormErrors>({});
  const { updateUser, user } = useAuth();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState<IUserParams>({
    username: user?.username,
    email: user?.email,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      data: { errors },
    } = await updateUser!(updateData);

    if (errors) {
      setErrs(errors);
    } else {
      navigate("/");
    }
  };

  return (
    <Form className="d-grid gap-3 w-50 m-auto" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="m-0 fs-2 text-muted">Atualizar</legend>
      </fieldset>

      <Form.Group as="section" id="username-group">
        <Form.Label htmlFor="username">Username</Form.Label>

        <Form.Control
          name="username"
          id="username"
          type="text"
          placeholder="Insira um nome de usuario"
          value={updateData.username}
          onChange={handleChange}
          autoFocus={true}
          aria-describedby={errs.username ? "usernameErrs" : undefined}
        />

        {errs.username && (
          <Form.Text id="usernameErrs" className="text-danger">
            {errs.username}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as="section" id="email-group">
        <Form.Label htmlFor="email">Email</Form.Label>

        <Form.Control
          name="email"
          id="email"
          type="text"
          placeholder="Insira um email"
          value={updateData.email}
          onChange={handleChange}
          aria-describedby={errs.email ? "emailErrs" : undefined}
        />

        {errs.email && (
          <Form.Text id="emailErrs" className="text-danger">
            {errs.email}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as="section" id="password-group">
        <Form.Label htmlFor="password">Senha</Form.Label>

        <Form.Control
          name="password"
          id="password"
          type="password"
          placeholder="Insira uma senha"
          value={updateData.password || ""}
          onChange={handleChange}
          aria-describedby={errs.password ? "passwordErrs" : undefined}
        />

        {errs.password && (
          <Form.Text id="passwordErrs" className="text-danger">
            {errs.password}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as="section" id="password_confirmation-group">
        <Form.Label htmlFor="password_confirmation">
          Repita sua senha
        </Form.Label>

        <Form.Control
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          placeholder="Confirme a sua senha"
          value={updateData.password_confirmation || ""}
          onChange={handleChange}
          aria-describedby={
            errs.password_confirmation ? "password_confirmationErrs" : undefined
          }
        />

        {errs.password_confirmation && (
          <Form.Text id="password_confirmationErrs" className="text-danger">
            {errs.password_confirmation}
          </Form.Text>
        )}
      </Form.Group>

      {errs.global && (
        <Alert key="danger" variant="danger" className="mb-0">
          {errs.global}
        </Alert>
      )}

      <Button className="mt-1 p-2" type="submit">
        Editar
      </Button>
    </Form>
  );
}
