-- Add missing columns to existing tables

-- Add reset token fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_expires TIMESTAMP WITH TIME ZONE;

-- Add additional database methods to support new functionality
-- This will be handled in the DatabaseService class

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

-- Add storage bucket policy for file uploads (if using Supabase)
-- This would be done in Supabase dashboard:
-- CREATE POLICY "Users can upload files" ON storage.objects FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can view files" ON storage.objects FOR SELECT USING (true);
