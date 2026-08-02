import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ ok: true, status: "healthy (no database_url configured)" });
    }
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
