
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, User2, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

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
                Bem-vindo, {user?.name}
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
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}