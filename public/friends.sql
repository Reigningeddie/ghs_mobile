CREATE TABLE public.friends (
  id bigint generated always as identity primary key,
  user_id bigint not null references public.profiles(id) on delete cascade,
  friend_id bigint not null references public.profiles(id) on delete cascade,
  status text check (status in ('pending', 'accepted', 'blocked')) default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- prevent duplicate relationships
  constraint friends_unique_pair unique (user_id, friend_id),
  -- prevent self-friending
  constraint no_self_friend check (user_id <> friend_id)
);
