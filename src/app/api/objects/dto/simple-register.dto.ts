export interface AccountRegister {
  email: string;
  password: string;
}
export interface GoogleAccountRegister {
  email: string;
}

export interface UserRegister {
  telefono?: string;
  sector: string;
  state?: string;
}

export interface GeneralInfoRegister {
  nombre: string;
  apellidoP: string;
  apellidoM?: string;
  genero: string;
}

export interface SimpleRegister {
  account: AccountRegister;
  user: UserRegister;
  generalInfo: GeneralInfoRegister;
}

export interface GoogleRegister {
  account: GoogleAccountRegister;
  user: UserRegister;
  generalInfo: GeneralInfoRegister;
}
