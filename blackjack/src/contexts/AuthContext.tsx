"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { User, AuthContextType } from "@/types";
import {
  getTokenFromCookies,
  setTokenCookie,
  removeTokenCookie,
} from "@/utils/token";

const AuthCtx = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

interface JWTPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  score: number;
  exp: number;
  iat: number;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();

    // Escutar por mudanças no token via URL (após redirect do backend)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      handleTokenReceived(tokenFromUrl);
      // Limpar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const checkAuth = (): void => {
    try {
      const storedToken = getTokenFromCookies();

      if (storedToken) {
        const decodedToken = jwtDecode<JWTPayload>(storedToken);

        // Verificar se o token não expirou
        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser({
            id: decodedToken.id,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
            picture: decodedToken.picture,
            score: decodedToken.score,
          });
        } else {
          // Token expirado
          removeTokenCookie();
          setToken(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      removeTokenCookie();
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenReceived = (receivedToken: string): void => {
    try {
      // Opcional: verificar se o token não está malformado
      const decodedToken = jwtDecode<JWTPayload>(receivedToken);

      setTokenCookie(receivedToken);
      setToken(receivedToken);
      setUser({
        id: decodedToken.id,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        email: decodedToken.email,
        picture: decodedToken.picture,
        score: decodedToken.score,
      });
    } catch (error) {
      console.error("Token recebido é inválido:", error);
      // Token malformado - não salvar
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Fazer logout no backend (opcional)
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      removeTokenCookie();
      setToken(null);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    logout
  }

  return (
    <AuthCtx.Provider value={value}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthCtx)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
