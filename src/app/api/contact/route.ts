import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-static";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_TYPES = new Set([
  "wedding",
  "commercial",
  "portrait",
  "film",
  "event",
  "other",
]);

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as null | {
      name?: string;
      email?: string;
      projectType?: string;
      message?: string;
    };

    if (!body) {
      return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const name = (body.name ?? "").trim().slice(0, 120);
    const email = (body.email ?? "").trim().slice(0, 200);
    const projectType = ALLOWED_TYPES.has((body.projectType ?? "").toLowerCase())
      ? (body.projectType as string).toLowerCase()
      : "other";
    const message = (body.message ?? "").trim().slice(0, 4000);

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Please tell me your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10) {
      return Response.json(
        { ok: false, error: "Tell me a little more about your project (10+ characters)." },
        { status: 400 },
      );
    }

    if (!process.env.DATABASE_URL) {
      console.warn("[contact] DATABASE_URL not set, message accepted:", { name, email, projectType });
      return Response.json({ ok: true, demo: true });
    }

    await db.insert(messages).values({ name, email, projectType, message });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed to store message", error);
    return Response.json(
      { ok: false, error: "Something went wrong on my end. Try again in a moment." },
      { status: 500 },
    );
  }
}
