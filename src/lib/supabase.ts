import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://noycgzymrkgjjqcytyqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5veWNnenltcmtnampxY3l0eXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1Nzg3NDYsImV4cCI6MjA1NDE1NDc0Nn0.VSo0FM1RobU9X_s8MQ-L9leSbSU3gpIIEQzkVCadwx4';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface Reservation {
  id: string;
  user_id?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}