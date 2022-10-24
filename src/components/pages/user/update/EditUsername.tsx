import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { IUpdateData } from "../../../../types/contexts/authTypes";
import { IUserFormErrors } from "../../../../types/errorsTypes";

export function EditUsername() {
  const { user, update } = useAuth()
  const navigate = useNavigate()
  const [errs, setErrs] = useState<IUserFormErrors>({})
  
  const [updateData, setUpdateData] = useState<IUpdateData>({
    username: user?.username,
    email: user?.email,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({ ...updateData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { data: { errors } } = await update(updateData)

    if (errors) {
      setErrs(errors)
    }
    else {
      navigate('/')
    }
  }

  return (
    <ListGroup.Item className="pb-3" as="section">
      <Form className="d-grid gap-3" onSubmit={handleSubmit}>
        <Form.Group as="section" id="username-group">
          <Form.Label htmlFor="username">Username</Form.Label>

          <Form.Control
            name="username"
            id="username"
            type="text"
            placeholder="Insira um nome de usuario"
            value={updateData.username}
            onChange={handleChange}
            maxLength={20}
            required={true}
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
            type="email"
            placeholder="Insira um email"
            value={updateData.email}
            onChange={handleChange}
            maxLength={160}
            required={true}
            aria-describedby={errs.email ? "emailErrs" : undefined}
          />

          {errs.email && (
            <Form.Text id="emailErrs" className="text-danger">
              {errs.email}
            </Form.Text>
          )}
        </Form.Group>

        <Button className="mt-1 p-2" type="submit">Editar</Button>
      </Form>
    </ListGroup.Item>
  )
}