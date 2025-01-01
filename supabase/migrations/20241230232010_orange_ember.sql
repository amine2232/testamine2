/*
  # Add configuration fields to assistants table

  1. Changes
    - Add who_speaks_first field (text)
    - Add welcome_message field (text)
    - Add script field (text)

  2. Security
    - Existing RLS policies will cover the new fields
*/

-- Add new columns to assistants table
ALTER TABLE assistants 
ADD COLUMN IF NOT EXISTS who_speaks_first text DEFAULT 'Assistant Initiate',
ADD COLUMN IF NOT EXISTS welcome_message text DEFAULT 'Hi, How are you doing today?',
ADD COLUMN IF NOT EXISTS script text;