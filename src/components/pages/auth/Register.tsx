import { ChangeEvent, FormEvent, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { IRegisterData } from '../../../types/contexts/authTypes'
import { IRegisterErrors } from '../../../types/errorsTypes'

export function Register() {
  const [errs, setErrs] = useState<IRegisterErrors>({})

  const [registerData, setRegisterData] = useState<IRegisterData>({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { data: { errors } } = await register(registerData)

    if (errors) {
      setErrs(errors)
    }
    else {
      navigate('/')
    }
  }

  return (
    <Form className="d-grid gap-3 w-50 m-auto" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="m-0 fs-2 text-muted" >Cadastrar-se</legend>

      </fieldset>

      <Form.Group as="section" id="username">
        <Form.Label htmlFor="username">Username</Form.Label>

        <Form.Control
          name="username"
          id="username"
          type="text"
          placeholder="Insira um nome de usuario"
          value={registerData.username}
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

      <Form.Group as="section" id="email">
        <Form.Label htmlFor="email">Email</Form.Label>

        <Form.Control
          name="email"
          id="email"
          type="email"
          placeholder="Insira um email"
          value={registerData.email}
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

      <Form.Group as="section" id="password">
        <Form.Label htmlFor="password">Senha</Form.Label>

        <Form.Control
          name="password"
          id="password"
          type="password"
          placeholder="Insira uma senha"
          value={registerData.password}
          onChange={handleChange}
          minLength={6}
          maxLength={20}
          required={true}
          aria-describedby={errs.password ? "passwordErrs" : undefined}
        />

        {errs.password && (
          <Form.Text id="passwordErrs" className="text-danger">
            {errs.password}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as="section" id="password_confirmation">
        <Form.Label htmlFor="password_confirmation">Repita sua senha</Form.Label>

        <Form.Control
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          placeholder="Confirme a sua senha"
          value={registerData.password_confirmation}
          onChange={handleChange}
          minLength={6}
          maxLength={20}
          required={true}
          aria-describedby={errs.password_confirmation ? "password_confirmationErrs" : undefined}
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

      <Button className="mt-1 p-2" type="submit">Entrar</Button>

      <footer className="m-auto">
        <Link to="/login" className="link-secondary">
          Ja possui uma conta?
        </Link>
      </footer>
    </Form>
  )
} 