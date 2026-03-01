export interface UserSession {
  idAccount: string;
  email: string;
  isAdmin: boolean;
  isAccountVerified: boolean;
  profile: {
    idUser: string;
    sector: string;
    state?: string;
    activityStatus: string;
    visibility: string;
    telefono?: string;
  } | null;
}
