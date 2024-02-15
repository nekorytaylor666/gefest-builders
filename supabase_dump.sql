--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH NOSUPERUSER INHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE anon;
ALTER ROLE anon WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticated;
ALTER ROLE authenticated WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticator;
ALTER ROLE authenticator WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:sJLbfDwTkvexFjSTCUlzkw==$9XXY8oOmWQNjulP1S0PAUE2nT664kSmN9Tncodx0qiQ=:701jaLi9xY7mHquttSN7RdmyycrGL8g8H3QnevbB030=';
CREATE ROLE dashboard_user;
ALTER ROLE dashboard_user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE pgbouncer;
ALTER ROLE pgbouncer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:me+XvNhSLw2ByLeQXFOv5w==$8VwYD7j8BFBgG4k7wHI5lFkaQIw3XDUFAl3zy+7tz4w=:nDlSpBkmo/5s8Hicz6iPnhRhlN2i2rtTIhTGpvmXLos=';
CREATE ROLE pgsodium_keyholder;
ALTER ROLE pgsodium_keyholder WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE pgsodium_keyiduser;
ALTER ROLE pgsodium_keyiduser WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE pgsodium_keymaker;
ALTER ROLE pgsodium_keymaker WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE pgtle_admin;
ALTER ROLE pgtle_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:k8P6M+02DlAVHVvGOlPc3g==$+fy9A9a7Ui/83oXUqh/zigGWLuqEGlckKKf1adGrbsA=:nas6G7h9M2jRykvv4J6xsuZOaZkp92e+It/AC3Eep+I=';
CREATE ROLE service_role;
ALTER ROLE service_role WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_admin;
ALTER ROLE supabase_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:MRW0pKRAhpHumqQJHuZO4A==$4lV2niQ2aMQatqpCsPgp1y9rSoZK8SbMvQpZ9gNd/rY=:vn2uqD8df0CCsU2HH+TUwQqC7sy46Ij9YjwdFUzIWdY=';
CREATE ROLE supabase_auth_admin;
ALTER ROLE supabase_auth_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:hk0AX02sOLGV+Wnf5elEMw==$KiQ3HkXkpwVB+62I11uCZkzubX69dXm4Qt5aa+Tcx20=:7cESTD3lJN1IoTObnfWFl9DSEIA1z1JV9OyzdY7jo/0=';
CREATE ROLE supabase_read_only_user;
ALTER ROLE supabase_read_only_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:d1W0Gd87/qJP3DJsHQ6cXw==$wt+9HJD8h/B4Ff2KUIuBQFBIecL8c0I8jH5fVs0vlsY=:VaBhNST/838D+M7m+D/Dm6gx0chePqB3xzIt48LjJdE=';
CREATE ROLE supabase_replication_admin;
ALTER ROLE supabase_replication_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:QwrmeWVYed4iMNKG1pOs3w==$WNV1ONFBB6VhBrEit2uE1FOgqnrSpi66YjSWJX0Zayk=:4a9OaTbXydrTFDSJayvOk9uB1kGgcv1v/qMNImCSyQ8=';
CREATE ROLE supabase_storage_admin;
ALTER ROLE supabase_storage_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:45x0+jZPwaGQsQV3MjUGbg==$P2zGheIr57tB0H4MarEO13MlgBS/V3M9m5KoWjfDK8E=:yrYelkvo2OmW3Mcw/HTX9gN8t3mVbSVZtU/O+rnGtVE=';

--
-- User Configurations
--

--
-- User Config "anon"
--

ALTER ROLE anon SET statement_timeout TO '3s';

--
-- User Config "authenticated"
--

ALTER ROLE authenticated SET statement_timeout TO '8s';

--
-- User Config "authenticator"
--

ALTER ROLE authenticator SET session_preload_libraries TO 'supautils', 'safeupdate';
ALTER ROLE authenticator SET statement_timeout TO '8s';
ALTER ROLE authenticator SET lock_timeout TO '8s';

--
-- User Config "postgres"
--

ALTER ROLE postgres SET search_path TO E'\\$user', 'public', 'extensions';

--
-- User Config "supabase_admin"
--

ALTER ROLE supabase_admin SET search_path TO '$user', 'public', 'auth', 'extensions';

--
-- User Config "supabase_auth_admin"
--

ALTER ROLE supabase_auth_admin SET search_path TO 'auth';
ALTER ROLE supabase_auth_admin SET idle_in_transaction_session_timeout TO '60000';

--
-- User Config "supabase_storage_admin"
--

ALTER ROLE supabase_storage_admin SET search_path TO 'storage';


--
-- Role memberships
--

GRANT anon TO authenticator;
GRANT anon TO postgres;
GRANT authenticated TO authenticator;
GRANT authenticated TO postgres;
GRANT authenticator TO supabase_storage_admin;
GRANT pg_monitor TO postgres;
GRANT pg_read_all_data TO supabase_read_only_user;
GRANT pgsodium_keyholder TO pgsodium_keymaker;
GRANT pgsodium_keyholder TO postgres WITH ADMIN OPTION;
GRANT pgsodium_keyholder TO service_role;
GRANT pgsodium_keyiduser TO pgsodium_keyholder;
GRANT pgsodium_keyiduser TO pgsodium_keymaker;
GRANT pgsodium_keyiduser TO postgres WITH ADMIN OPTION;
GRANT pgsodium_keymaker TO postgres WITH ADMIN OPTION;
GRANT pgtle_admin TO postgres;
GRANT service_role TO authenticator;
GRANT service_role TO postgres;
GRANT supabase_auth_admin TO postgres;
GRANT supabase_storage_admin TO postgres;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

