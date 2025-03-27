export type UserRole = 'client' | 'professional';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Appointment {
  id: string;
  professional_id: string;
  client_id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}