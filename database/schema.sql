-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

-- Create friends table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) on delete cascade unique not null,
  friend_id uuid NOT NULL REFERENCES auth.users(id) on delete cascade unique not null,
  status VARCHAR(10) NOT NULL DEFAULT 'pending'
);

-- Create indexes on friends table
CREATE INDEX idx_friends_user_id ON friends (user_id);
CREATE INDEX idx_friends_friend_id ON friends (friend_id);

-- Create friend_pending table
CREATE TABLE friend_pending (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_requester_id INTEGER NOT NULL REFERENCES users(id)
);

-- Create indexes on friend_pending table
CREATE INDEX idx_friend_pending_user_id ON friend_pending (user_id);
CREATE INDEX idx_friend_pending_friend_requester_id ON friend_pending (friend_requester_id);

-- Add foreign key constraints to establish relationships between tables
ALTER TABLE friends ADD CONSTRAINT fk_friends_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE friends ADD CONSTRAINT fk_friends_friend_id FOREIGN KEY (friend_id) REFERENCES auth.users(id);
ALTER TABLE friend_pending ADD CONSTRAINT fk_friend_pending_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE friend_pending ADD CONSTRAINT fk_friend_pending_friend_requester_id FOREIGN KEY (friend_requester_id) REFERENCES users(id);

-- Create profiles table
CREATE TABLE public.profiles (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  user_name text unique,
  first_name text,
  last_name text,
  mobile_number text,
  dom_hand text,
  points integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable row level security on profiles table
ALTER TABLE public.profiles enable row level security;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- The WITH CHECK clause is not allowed in a policy for an INSERT operation
-- Instead, we'll create a trigger to enforce this rule
CREATE TRIGGER insert_own_profile_trigger
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.check_insert_own_profile();

CREATE OR REPLACE FUNCTION public.check_insert_own_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF auth.uid() != NEW.user_id THEN
    RAISE EXCEPTION 'Only the user can insert their own profile';
  END IF;
  RETURN NEW;
END;
$$;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER SET SEARCH_PATH = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, points)
  VALUES (NEW.id, 0);
  RETURN NEW;
END;
$$;

-- Create trigger to call function on new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create index on profiles table
CREATE INDEX profiles_user_id_idx ON public.profiles(user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Create trigger to call function on profile update
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 

database\schema.sql
