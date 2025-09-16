'use client';
import { User } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type UserContextType = { user: User | null };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/proxy')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data));
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de UserProvider');
  return context;
};
