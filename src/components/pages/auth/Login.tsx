import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "../../../hooks/useAuth"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const loginSchema = yup.object({
  email: yup
    .string()
    .required("email requerido")
    .trim("email invalido")
    .email("email invalido")
    .max(160, "email muito longo"),
  password: yup
    .string()
    .required("senha requerida")
    .trim("senha invalida")
    .min(6, "senha muito longa")
    .max(20, "senha muito longa")
})

type TLoginInputs = yup.InferType<typeof loginSchema>

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginInputs>({
    resolver: yupResolver(loginSchema), 
  })

  const { login } = useAuth()

  const onSubmit: SubmitHandler<TLoginInputs> = (data) => {
    console.log(data)
    
    // login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        type="email"
        placeholder="Email" 
        {...register("email")} 
      />
      {errors.email && <span>{errors.email.message}</span>}

    <br />

      <label htmlFor="password">Password</label>
      <input 
        id="password" 
        type="password"
        placeholder="Password" 
        {...register("password")}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <br />

      <button type="submit">Entrar</button>
    </form>
  )
} 