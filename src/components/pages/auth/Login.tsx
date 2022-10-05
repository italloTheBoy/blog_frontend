import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAuth } from "../../../hooks/useAuth"
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form } from "react-bootstrap"
import { loginSchema } from "../../../schemas/loginSchema"
import { TLoginData } from "../../../types/contexts/authTypes"

export function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<TLoginData>({
    resolver: yupResolver(loginSchema),
  })

  const { login } = useAuth()

  const onSubmit: SubmitHandler<TLoginData> = (data) => {
    console.log(data)


    // login(data)
  }

  return (
    <Form className="d-grid gap-3 w-50 m-auto" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mt-3" as="section">
        <Form.Label htmlFor="email">Email</Form.Label>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Control
              id="email"
              aria-describedby={errors.email ? "emailErrors" : undefined}
              type="email"
              placeholder="Insira um email"
              maxLength={160}
              required={true}
              autoFocus={true}
              {...field}
            />
          )}
        />

        {errors.email && (
          <Form.Text id="emailErrors" className="text-danger">
            {errors.email.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as="section">
        <Form.Label htmlFor="password">Password</Form.Label>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Control
              id="password"
              aria-describedby={errors.password ? "passwordErrors" : undefined}
              type="password"
              placeholder="Insira uma senha"
              minLength={6}
              maxLength={20}
              required={true}
              {...field}
            />
          )}
        />

        {errors.password && (
          <Form.Text id="passwordErrors" className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button className="mt-1 p-2" type="submit">Entrar</Button>
    </Form>
  )
} 