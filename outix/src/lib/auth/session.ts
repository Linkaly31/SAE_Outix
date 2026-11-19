import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

// Cached so several calls in the same request hit the database once
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/connexion");
  return session;
}