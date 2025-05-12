
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, User2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '@/types';



export default function Dashboard() {
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const [professional, setProfessional] = useState('');
  const [date, setDate] = useState('');
  const { user, logout, scheduleAppointment } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (

    <div className="min-h-screen bg-blue-50">
      <nav className="bg-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-semibold">
                Therapy Schedule
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Bem-vindo, {user ? user.name : 'default'}
              </h2>
              <p className="mt-1 text-gray-600">
                {user?.role === 'professional' ? 'Profissional' : 'Paciente'}
              </p>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-blue-700" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">
                      Próximas Consultas
                    </h3>
                  </div>
                  <Link
                    href="/appointments"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                  >
                    Ver consultas
                  </Link>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt- ml-2.5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                  >
                    Agendar consultas
                  </button>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      <h3 className="text-xl font-bold mb-4">Agendar Consulta</h3>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();

                          if (!user) {
                            console.error("Usuário não autenticado");
                            return;
                          }

                          const newAppointment: Appointment = {
                            id: crypto.randomUUID(),
                            professional,
                            service,
                            client_id: user ? user._id : 'sem ID',
                            date,
                            time,
                            status: 'pending',
                            created_at: new Date().toISOString()
                          };

                          const { error } = await scheduleAppointment(newAppointment);

                          if (!error) {
                            console.log('Agendamento salvo!');
                            setIsModalOpen(false);
                          } else {
                            console.error('Erro ao salvar agendamento:', error);
                          }

                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Categoria</label>
                          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={service}
                            onChange={(e) => setService(e.target.value)}>
                            <option value="">Selecione uma categoria</option>
                            <option value="Psicologia">Psicologia</option>
                            <option value="Fisioterapia">Fisioterapia</option>
                            <option value="Nutrição">Nutrição</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Horário</label>
                          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}>
                            <option value="">Selecione uma categoria</option>
                            <option value="10:00">10:00</option>
                            <option value="14:30">14:30</option>
                            <option value="16:00">16:00</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Profissional</label>
                          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={professional}
                            onChange={(e) => setProfessional(e.target.value)}>
                            <option value="">Selecione uma categoria</option>
                            <option value="Dr. João">Dr. João</option>
                            <option value="Dr. Ana">Dra. Ana</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Data</label>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
                          >
                            Agendar
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="ml-2 text-sm text-gray-600 hover:underline"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

{/* <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <User2 className="h-8 w-8 text-blue-700" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">
                      {user?.role === 'professional' ? 'Meus Pacientes' : 'Meus Profissionais'}
                    </h3>
                  </div>
                  <Link
                    href="/appointments"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                  >
                    {user?.role === 'professional' ? 'Ver pacientes' : 'Agendar consulta'}
                  </Link>
                </div> */}