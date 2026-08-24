import { sql } from "./db";
import { hashPassword, verifyPassword } from "./passwords";

export async function getAdminPasswordHash(): Promise<string | null> {
  try {
    const rows = await sql`SELECT admin_password_hash FROM site_settings WHERE id = 1 LIMIT 1`;
    const hash = rows[0]?.admin_password_hash as string | null | undefined;
    return hash || null;
  } catch {
    return null;
  }
}

export async function setAdminPasswordHash(plainPassword: string): Promise<void> {
  const hash = hashPassword(plainPassword);
  await sql`
    INSERT INTO site_settings (id, admin_password_hash)
    VALUES (1, ${hash})
    ON CONFLICT (id) DO UPDATE SET admin_password_hash = EXCLUDED.admin_password_hash
  `;
}

export async function verifyOwnerPassword(candidate: string): Promise<boolean> {
  const dbHash = await getAdminPasswordHash();
  if (dbHash) {
    return verifyPassword(candidate, dbHash);
  }
  // Fail closed: if ADMIN_PASSWORD isn't set on the server, never fall
  // back to any default (empty string or otherwise) — that would let an
  // unconfigured deployment be logged into with a blank or guessable
  // password. No env var configured means the owner account simply
  // can't log in via this fallback until it is set.
  const envPw = process.env.ADMIN_PASSWORD;
  if (!envPw) return false;
  return candidate === envPw;
}
