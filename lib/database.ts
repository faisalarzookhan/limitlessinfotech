// lib/database.ts
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'employee' | 'client';
  createdAt: Date;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: 'No rows found'
    console.error('Error getting user by email:', error);
    return null;
  }

  return data;
};

export const createUser = async (email: string, passwordHash: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: uuidv4(), email, passwordHash, created_at: new Date() }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
};
