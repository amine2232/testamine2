/*
  # Add Assistant Configuration Fields

  1. New Fields
    - who_speaks_first: Controls who initiates the conversation
    - welcome_message: Initial greeting message
    - script: Full conversation script
    
  2. Security
    - Inherits existing RLS policies from assistants table
*/

-- Add configuration fields to assistants table
DO $$ 
BEGIN
  -- Add who_speaks_first column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assistants' AND column_name = 'who_speaks_first'
  ) THEN
    ALTER TABLE assistants ADD COLUMN who_speaks_first text;
  END IF;

  -- Add welcome_message column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assistants' AND column_name = 'welcome_message'
  ) THEN
    ALTER TABLE assistants ADD COLUMN welcome_message text;
  END IF;

  -- Add script column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'assistants' AND column_name = 'script'
  ) THEN
    ALTER TABLE assistants ADD COLUMN script text;
  END IF;
END $$;