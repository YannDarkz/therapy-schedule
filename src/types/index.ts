export type UserRole = 'client' | 'professional';

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  name: string;
  appointments: Appointment[]
}

export interface Appointment {
  id: string;
  professional: string;
  service: string;
  client_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}