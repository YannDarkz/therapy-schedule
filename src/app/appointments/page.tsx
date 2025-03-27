
"use client"

import { useAuth } from '@/hooks/useAuth';
import type { Appointment } from '@/types';

import React, { useState, useEffect } from 'react';
import  Link  from 'next/link';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// import { ptBR } from "date-fns/locale/pt-BR";


// Dados mockados para exemplo
const mockAppointments: Appointment[] = [
  {
    id: '1',
    professional_id: '2',
    client_id: '1',
    date: '2025-03-30T10:00:00Z',
    status: 'pending',
    created_at: '2025-03-25T22:45:08Z'
  },
  {
    id: '2',
    professional_id: '2',
    client_id: '1',
    date: '2025-04-05T14:30:00Z',
    status: 'confirmed',
    created_at: '2025-03-25T12:45:08Z'
  }
];

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: 'Pendente',
      confirmed: 'Confirmada',
      completed: 'Concluída',
      cancelled: 'Cancelada',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center text-white hover:text-blue-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Link>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-white" />
              <span className="ml-2 text-white text-lg font-medium">
                Consultas
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Minhas Consultas
                </h2>
                {user?.role === 'client' && (
                  <Link
                    href="/appointments/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                  >
                    Agendar Consulta
                  </Link>
                )}
              </div>
            </div>

            <div className="px-6 py-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma consulta</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Você ainda não tem consultas agendadas.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-blue-100">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR } )}
                            
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(appointment.date), 'HH:mm')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}