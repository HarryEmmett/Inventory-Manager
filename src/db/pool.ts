import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.POSTGRES_SERVER_HOST || "localhost",
  user: process.env.POSTGRES_SERVER_USER || "harry",
  database: process.env.POSTGRES_SERVER_DATABASE || "inventory_db",
  password: process.env.POSTGRES_SERVER_PASSWORD || "password",
  port: Number(process.env.POSTGRES_SERVER_PORT ?? 5432),
});
