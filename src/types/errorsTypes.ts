export interface IErrors {
  global?: string
}

export interface IRegisterErrors extends IErrors{
	email?: string
  username?: string
	password?: string
	password_confirmation?: string
}
