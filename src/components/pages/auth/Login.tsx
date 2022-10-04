import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "../../../hooks/useAuth"

type LoginInputs = {
  email: string,
  password: string,
}

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>()
  const { login } = useAuth()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        placeholder="Email" 
        type="email"
        {...register("email", { 
          required: "Insira um email",
          pattern: {
            value: /^[^\s]+@[^\s]+$/,
            message: "Insira um email valido"
          }
        })} 
      />
      {errors.email && <span>{errors.email.message}</span>}

    <br />

      <label htmlFor="password">Password</label>
      <input 
        id="password" 
        placeholder="Password" 
        type="password"
        {...register("password", { 
          required: "Insira uma senha",
          minLength: {
            value: 6,
            message: "Senha muito curta"
          },
          maxLength: {
            value: 20,
            message: "Senha muito longa"
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <br />

      <button type="submit">Entrar</button>
    </form>
  )
} 