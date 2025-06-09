import { useState, useEffect } from 'react';
import type { Appointment, User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { error: null };
     
    } catch (error) {
      console.error(error);
      return { error: 'Erro de conexão' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: string, appointments:[]) => {
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, appointments }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no registro');
      }

      const data = await response.json();
      setUser(data.user);
      return { error: null };

    } catch (error) {
      console.error(error);
      return { error: 'Erro de conexão!' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    return Promise.resolve();
  };

  const scheduleAppointment = async (appointment: Appointment) => {
    if (!user) {
      console.error("Usuário não está logado.");
      return { error: 'Usuário não autenticado' };
    }
  
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          appointment
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao agendar');
      }
  
      const data = await response.json();
  
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      return { error: null };
    } catch (err: any) {
      console.error("Erro ao agendar:", err.message);
      return { error: 'Erro ao agendar' };
    }
  };

  return { user, loading, login, register, logout, scheduleAppointment };
}
