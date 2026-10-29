import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.warn(
    "[db] DATABASE_URL is not set — reads fall back to the starter content in /data, and every content write will fail until it's configured."
  );
}

// No `cache: "no-store"`: it forced every public page to render dynamically
// (a Neon wake-up per visit). Admin pages and /api routes are force-dynamic,
// so their queries stay uncached.
export const sql = neon(process.env.DATABASE_URL || "postgres://unset");

export const DB_ERROR_MESSAGE =
  "Couldn't save — the database couldn't be reached. Check that DATABASE_URL is set correctly (and that your Neon project is active), then try again.";

export function dbErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  if (/column .* does not exist|relation .* does not exist/i.test(message)) {
    return "Couldn't save — the database is missing a column or table this feature needs. Run `node scripts/setup-db.mjs` against this database (see README), then try again.";
  }
  return DB_ERROR_MESSAGE;
}
