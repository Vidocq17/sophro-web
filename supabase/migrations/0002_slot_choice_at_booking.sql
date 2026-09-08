-- supabase/migrations/0002_slot_choice_at_booking.sql
-- Type de séance et format ne sont plus des attributs du créneau : c'est le
-- visiteur qui les choisit au moment de la réservation. La capacité devient
-- le seul réglage du créneau (1 à 10 places).

alter table availability_slots drop column session_type;
alter table availability_slots drop column format;

alter table availability_slots drop constraint availability_slots_capacity_check;
alter table availability_slots add constraint availability_slots_capacity_check check (capacity > 0 and capacity <= 10);

alter table bookings add column session_type text not null check (session_type in ('individuelle', 'collective'));
alter table bookings add column format text not null check (format in ('visio', 'présentiel'));

drop function if exists book_slot(uuid, text, text, text, text, text);

create function book_slot(
  p_slot_id uuid,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_message text,
  p_session_type text,
  p_format text
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

  insert into bookings (slot_id, first_name, last_name, email, phone, message, session_type, format)
  values (p_slot_id, p_first_name, p_last_name, p_email, p_phone, p_message, p_session_type, p_format)
  returning * into v_booking;

  return v_booking;
end;
$$;
