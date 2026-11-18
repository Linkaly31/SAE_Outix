import "dotenv/config";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";

import { db } from "../src/db";
import { user, account } from "../src/db/schema";

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME?.toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("SEED_ADMIN_USERNAME and SEED_ADMIN_PASSWORD must be set");
  }

  const id = randomUUID();

  await db.transaction(async (tx) => {
    await tx.insert(user).values({
      id,
      firstName: "Marie",
      lastName: "Dupont",
      name: "Marie Dupont",
      username,
      displayUsername: username,
      email: `${username}@outix.local`,
      emailVerified: true,
      role: "admin",
    });

    // Better Auth stores credentials in the account table
    await tx.insert(account).values({
      id: randomUUID(),
      accountId: id,
      providerId: "credential",
      userId: id,
      password: await hashPassword(password),
    });
  });

  console.log(`Admin "${username}" created`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});