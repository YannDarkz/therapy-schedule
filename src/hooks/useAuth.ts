import { useState, useEffect } from 'react';
import type { User } from '@/types';

// Simular usuário local
const mockUser: User = {
  id: '1',
  email: 'usuario@exemplo.com',
  name: 'Usuário Teste',
  role: 'client'
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = (email: string, password: string) => {
    setLoading(true);
    // Simular login
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
    return Promise.resolve({ error: null });
  };

  const logout = () => {
    setUser(null);
    return Promise.resolve();
  };

  return { user, loading, login, logout };
}