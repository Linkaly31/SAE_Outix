import { createAuthClient } from "better-auth/react";
import { usernameClient, adminClient, inferAdditionalFields } from "better-auth/client/plugins";

import type { auth } from "./auth";
import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    adminClient({ ac, roles }),
    inferAdditionalFields<typeof auth>(),
  ],
});