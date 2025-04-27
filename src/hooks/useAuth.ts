import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

export function useAuth() {
    const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no login');
      }

      const data = await response.json();

      setUser(data.user);
      return { error: null };
     
    } catch (error) {
      console.error(error);
      return { error: 'Erro de conexão' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    return Promise.resolve();
  };

  return { user, loading, login, logout };
}



// import { useState, useEffect } from 'react';
// import type { User } from '@/types';

// // Simular usuário local
// const mockUser: User = {
//   id: '1',
//   email: 'usuario@exemplo.com',
//   name: 'Yannn Teste',
//   role: 'client'
// };

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simular carregamento
//     const timer = setTimeout(() => {
//       setUser(mockUser);
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   //  mandar req para o beck
//   const login = (email: string, password: string) => { 
//     setLoading(true);
//     // Simular login
//     setTimeout(() => {
//       setUser(mockUser);
//       setLoading(false);
//     }, 1000);
//     return Promise.resolve({ error: null });
//   };

//   const logout = () => {
//     setUser(null);
//     return Promise.resolve();
//   };

//   return { user, loading, login, logout };
// }