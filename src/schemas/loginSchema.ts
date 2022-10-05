import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email requerido")
    .trim("Email invalido")
    .email("Email invalido")
    .max(160, "Email muito longo"),
  password: yup
    .string()
    .required("Senha requerida")
    .trim("Senha invalida")
    .min(6, "Senha muito longa")
    .max(20, "Senha muito longa")
})