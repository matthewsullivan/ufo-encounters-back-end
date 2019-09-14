DROP TABLE IF EXISTS public.encounters CASCADE;

CREATE TABLE public.encounters
( 
  id serial PRIMARY KEY,
  city varchar(256) NOT NULL,
  comments text NOT NULL,
  country varchar(256) NOT NULL,
  date varchar(256) NOT NULL,
  duration_m varchar(256) NOT NULL,
  duration_s numeric NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  shape varchar(256) NOT NULL,
  state varchar(256) NOT NULL
  created timestamptz default now() NOT NULL,
  updated timestamptz default now() NOT NULL
);