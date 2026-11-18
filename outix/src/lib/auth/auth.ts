import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { username, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import { ac, roles } from "./permissions";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "mysql",
  }),

  // Accounts are created by an administrator only
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 8,
  },

  user: {
    additionalFields: {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
    },
  },

  hooks: {
    // Admin accounts are only created through the seed script and cannot be removed or edited from the app
    before: createAuthMiddleware(async (ctx) => {
      const body = ctx.body as { userId?: string } | undefined;

      if (
        (ctx.path === "/admin/remove-user" || ctx.path === "/admin/set-role") &&
        body?.userId
      ) {
        const target = await ctx.context.internalAdapter.findUserById(body.userId);
        if ((target as { role?: string } | null)?.role === "admin") {
          throw new APIError("FORBIDDEN", {
            message: "Admin accounts cannot be edited or removed.",
            code: "ADMIN_ACCOUNT_PROTECTED",
          });
        }
      }
    }),
  },

  plugins: [
    username(),
    admin({
      ac,
      roles,
      defaultRole: "visitor",
      adminRoles: ["admin"],
    }),
    nextCookies(), // must stay last
  ],
});