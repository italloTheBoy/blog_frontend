export interface IErrors {
  global?: string
}

export interface IUserFormErrors extends IErrors{
	email?: string
  username?: string
	password?: string
	password_confirmation?: string
}
