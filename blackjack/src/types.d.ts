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
  logout: () => Promise<void>
}

export type AuthContextType = AuthState & AuthActions