/*
  # Create assistants table and related security policies

  1. New Tables
    - `assistants`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `company_name` (text, optional)
      - `user_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `assistants` table
    - Add policies for users to manage their own assistants
*/

-- Create assistants table
CREATE TABLE IF NOT EXISTS assistants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_name text,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE assistants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own assistants"
  ON assistants
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assistants"
  ON assistants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assistants"
  ON assistants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assistants"
  ON assistants
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assistants_updated_at
  BEFORE UPDATE
  ON assistants
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();