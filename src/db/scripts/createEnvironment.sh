#!/bin/bash

DB_NAME="inventory_db"
DB_USER="harry"
DB_HOST="localhost"
DB_PORT="5432"
DB_PASSWORD="password" # should hide this really

TABLE_SCHEMA_SQL="
CREATE TABLE users (
   u_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   u_username VARCHAR ( 255 ) NOT NULL UNIQUE,
   u_password VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE types (
   t_type_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   t_type_name VARCHAR ( 50 ) NOT NULL UNIQUE
);

CREATE TABLE pokemon (
   p_pokemon_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   p_pokemon_name VARCHAR ( 255 ) NOT NULL UNIQUE,
   p_picture TEXT NOT NULL,
   p_type_id INT REFERENCES types(t_type_id)
);

CREATE TABLE userhaspokemon (
   up_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   up_type_id INT REFERENCES types(t_type_id) ON DELETE CASCADE,
   up_user_id INT REFERENCES users(u_id) ON DELETE CASCADE,
   up_pokemon_id INT REFERENCES pokemon(p_pokemon_id) ON DELETE CASCADE,
   up_nickname VARCHAR (100) NOT NULL,
   up_captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   up_pokemon_lvl INT CHECK (up_pokemon_lvl <= 99),
   CONSTRAINT unique_user_pokemon UNIQUE (up_user_id, up_pokemon_id)
);
"

TEST_DATA_SQL="
INSERT INTO users (u_username, u_password) VALUES ('Harry', 'password');
INSERT INTO types (t_type_name) VALUES ('Fire');
INSERT INTO types (t_type_name) VALUES ('Grass');
INSERT INTO pokemon (p_pokemon_name, p_picture, p_type_id) VALUES ('Charmander', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png', 1);
INSERT INTO pokemon (p_pokemon_name, p_picture, p_type_id) VALUES ('Bulbasaur', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png', 2);
INSERT INTO userhaspokemon (up_type_id, up_user_id, up_pokemon_id, up_nickname, up_pokemon_lvl) VALUES (1, 1, 1, 'Char Char', 8);
INSERT INTO userhaspokemon (up_type_id, up_user_id, up_pokemon_id, up_nickname, up_pokemon_lvl) VALUES (2, 1, 2, 'Bulby', 6);
"

DROP_ALL_TABLES() {
   echo "Dropping all tables in $DB_NAME"

   tables=$(PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -t -c "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';")
    
    for table in $tables; do
      if [[ -n "$table" ]]; then
         PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "DROP TABLE IF EXISTS \"$table\" CASCADE;"
         echo "Dropped table: $table"
      fi
   done
}

CREATE_TABLES() {
  echo "Creating new tables..."
    
   PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "$TABLE_SCHEMA_SQL"
    
   echo "Tables created successfully."
}

INSERT_TEST_DATA() {
    echo "Inserting test data..."
    
    PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "$TEST_DATA_SQL"
    
    echo "Test data inserted successfully."
}

DROP_ALL_TABLES
CREATE_TABLES
INSERT_TEST_DATA