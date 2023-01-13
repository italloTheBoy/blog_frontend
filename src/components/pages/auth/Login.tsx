import { useAuth } from "../../../hooks/useAuth"
import { Button, Form } from "react-bootstrap"
import { ILoginParams } from "../../../types/contexts/authTypes"
import { useNavigate } from "react-router-dom"
import { useState, ChangeEvent, FormEvent } from "react"
import { Alert } from "react-bootstrap"
import { IErrors } from "../../../types/errorsTypes"
import { Link } from "react-router-dom"

export function Login() {
  const { login } = useAuth()

  const navigate = useNavigate()
  
  const [errs, setErrs] = useState<IErrors>({})
  const [loginData, setLoginData] = useState<ILoginParams>({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { data: { errors } } = await login!(loginData)

    if (errors) {
      setErrs(errors)
      setLoginData({...loginData, password: ""})
    }
    else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset className="d-grid gap-3 w-50 m-auto">
        <legend className="m-0 fs-2 text-muted">Entrar</legend>

        <Form.Group as="section" id="email-group">
          <Form.Label htmlFor="email">Email</Form.Label>

          <Form.Control
            name="email"
            id="email"
            type="email"
            placeholder="Insira um email"
            value={loginData.email}
            onChange={handleChange}
            maxLength={160}
            required={true}
            autoFocus={true}
          />
        </Form.Group>

        <Form.Group as="section" id="password-group">
          <Form.Label htmlFor="password">Senha</Form.Label>

          <Form.Control
            name="password"
            id="password"
            type="password"
            placeholder="Insira uma senha"
            value={loginData.password}
            onChange={handleChange}
            minLength={6}
            maxLength={20}
            required={true}
          />
        </Form.Group>

        {errs.global && (
          <Alert key="danger" variant="danger" className="mb-0">
            {errs.global}
          </Alert>
        )}

        <Button className="mt-1 p-2" type="submit">Entrar</Button>

        <footer className="m-auto">
          <Link to="/register" className="link-secondary">
            Ainda não possui uma conta?
          </Link>
        </footer>
      </fieldset>

    </Form>
  )
} 
