export interface Credentials {
  email: string;
  password: string;
}

export interface AuthContextValue {
  isLoading: boolean;
  isAuth: boolean;
  login: (creds: Credentials) => void;
  logout: () => void;
  checkAuth: () => Promise<any>;
  register: (creds: Credentials) => void;
  isErrorLogin: boolean;
  errorLoginMessage: string | null;
  isErrorRegister: boolean;
  errorRegisterMessage: string | null;
}
