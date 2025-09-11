// lib/database.ts
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a user in the database.
 */
export type User = {
  /** The unique identifier for the user (UUID). */
  id: string;
  /** The user's email address. */
  email: string;
  /** The hashed password for the user. */
  passwordHash: string;
  /** The role of the user within the system. */
  role: 'admin' | 'employee' | 'client';
  /** The timestamp when the user was created. */
  createdAt: Date;
};

/**
 * Retrieves a user from the database by their email address.
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to the user object, or null if not found or an error occurs.
 */
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

/**
 * Creates a new user in the database.
 * @param email - The email address for the new user.
 * @param passwordHash - The hashed password for the new user.
 * @returns A promise that resolves to the newly created user object, or null if an error occurs.
 */
export const createUser = async (email: string, passwordHash: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: uuidv4(), email, passwordHash, created_at: new Date() }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
};
