export type Card = {
  id: number;
  suit: string;
  value: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  score: number;
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>
}

export interface AuthContextType extends AuthState, AuthActions {}