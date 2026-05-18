-- Add staff role to agents table
create type staff_role as enum ('agent', 'broker', 'admin', 'staff');

alter table agents add column role staff_role not null default 'agent';
