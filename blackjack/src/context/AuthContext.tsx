'use client';
import { User } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';


type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Função para buscar usuário logado (chama sua API)
  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/proxy', {
        credentials: 'include', // importante para enviar cookies
      });

      if (res.ok) {
        const data = await res.json();
        console.log('User data fetched:', data);
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca usuário na montagem e sempre que mudar de página
  useEffect(() => {
    fetchUser();
    console.log('Pathname changed:', pathname);
  }, [pathname]);


  const login = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/auth/google', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Login falhou');

      const data = await res.json();
      setUser(data.user);
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try { 
      const res = await fetch('http://localhost:3000/api/proxy', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Logout falhou');
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchUser = () => fetchUser();

  return (
    <AuthContext.Provider value={{ user , isLoading, login, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
