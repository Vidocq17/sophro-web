-- supabase/migrations/0003_booking_requests.sql
-- Une réservation est d'abord une demande en attente de validation par Fiona.

alter table bookings alter column status set default 'pending';
alter table bookings drop constraint bookings_status_check;
alter table bookings add constraint bookings_status_check check (status in ('pending', 'confirmed', 'cancelled'));
