-- Création de la table reservations
create table if not exists reservations (
  id uuid default uuid_generate_v4() primary key,  -- ID unique pour chaque réservation
  guest_name text,  -- Nom de l'invité
  guest_email text,  -- Email de l'invité
  guest_phone text,  -- Téléphone de l'invité
  formule_title text,  -- Nom de la formule (ex: "Lavage Simple", "Lavage Complet", etc.)
  formule_price numeric,  -- Prix de la formule
  start_time timestamp,  -- Date et heure de début de la réservation
  end_time timestamp,  -- Date et heure de fin de la réservation
  status text default 'pending',  -- Statut de la réservation (par défaut 'pending')
  created_at timestamp default now()  -- Date de création de la réservation (par défaut à l'heure actuelle)
);
