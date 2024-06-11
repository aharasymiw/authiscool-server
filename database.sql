-- Create users table
CREATE TABLE users (
	id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	public_user_id uuid DEFAULT gen_random_uuid(),
  first_name VARCHAR,
  last_name VARCHAR,
  display_name VARCHAR NOT NULL,
  -- indexed
  email VARCHAR unique,
  phone VARCHAR,
  hashed_salted_password bytea NOT NULL,
  salt bytea NOT NULL,
  password_updated_at timestamptz NOT NULL DEFAULT NOW(),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

-- Index users by email, because we'll be looking that up a lot
CREATE INDEX IF NOT EXISTS idx_users_email
ON users (email);

-- Create passkeys table
CREATE TABLE passkeys (
	id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  public_key bytea NOT NULL,
  -- Unique constraint later created on (users_id and webauthn_user_id)
  users_id uuid NOT NULL REFERENCES users,
  -- indexed
  webauthn_user_id text,
  counter BIGINT,
  deviceType VARCHAR(32),  -- Currently the logest possible is 32 characters
  is_backup_eligible bool,
  is_backed_up bool,
  -- store string array as a CSV string
  transports VARCHAR(255), -- ex: ['ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb']
  created_at timestamptz NOT NULL DEFAULT NOW(),
  last_used_at timestamptz NOT NULL DEFAULT NOW(),
  -- Unique constraint on (users_id and webauthn_user_id)
  UNIQUE (users_id, webauthn_user_id)
);

-- Index passkeys by webauthn_user_id, because we'll be looking that up a lot
CREATE INDEX IF NOT EXISTS idx_passkeys_webauthn_user_id
ON passkeys (webauthn_user_id);
