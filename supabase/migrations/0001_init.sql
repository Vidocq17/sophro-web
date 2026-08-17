-- supabase/migrations/0001_init.sql

create table availability_slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  start_time time not null,
  end_time time not null,
  session_type text not null check (session_type in ('individuelle', 'collective')),
  format text not null check (format in ('cabinet', 'visio')),
  capacity int not null default 1 check (capacity > 0),
  booked_count int not null default 0 check (booked_count >= 0),
  created_at timestamptz not null default now(),
  constraint booked_within_capacity check (booked_count <= capacity)
);

create index idx_availability_slots_date on availability_slots (date);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references availability_slots (id),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  message text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index idx_bookings_slot_id on bookings (slot_id);

-- Atomic booking: only succeeds if the slot still has capacity.
-- Runs the capacity check and the insert in a single transaction so two
-- concurrent requests for the last spot can't both succeed.
create or replace function book_slot(
  p_slot_id uuid,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_message text
) returns bookings
language plpgsql
as $$
declare
  v_booking bookings;
begin
  update availability_slots
  set booked_count = booked_count + 1
  where id = p_slot_id
    and booked_count < capacity;

  if not found then
    raise exception 'SLOT_FULL' using errcode = 'P0001';
  end if;

  insert into bookings (slot_id, first_name, last_name, email, phone, message)
  values (p_slot_id, p_first_name, p_last_name, p_email, p_phone, p_message)
  returning * into v_booking;

  return v_booking;
end;
$$;

-- No public RLS policies: only the service-role key (used exclusively by
-- the SvelteKit server) can read/write these tables.
alter table availability_slots enable row level security;
alter table bookings enable row level security;
