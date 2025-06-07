'use client'

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Appointment } from '@/types';
import { useEffect, useState } from 'react';
import { log } from 'console';

export default function Appointments() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!loading && user) {
      console.log('sinceto log', user.appointments);
      
      // Se o user vem com agendamentos embutidos no JSON:
      setAppointments(user.appointments || []);
    }
  }, [user, loading]);

  if (loading) return <p>Carregando...</p>;

  if (!user) return <p>Usuário não autenticado</p>;

  return (
    <div>
      <h2>Agendamentos de {user.name}</h2>
      {appointments.length === 0 ? (
        <p>Você não possui agendamentos.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong className='text-[red]'>Data:</strong> {new Date(appointment.date).toLocaleDateString()}<br />
              <strong>Hora:</strong> {appointment.time}<br />
              <strong>Serviço:</strong> {appointment.service}<br />
              <strong>Profissional:</strong> {appointment.professional}<br />
              <strong>Status:</strong> {appointment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}