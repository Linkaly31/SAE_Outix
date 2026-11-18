import { authClient } from "./auth/auth-client";
import { authErrorMessage } from "./auth/auth-errors";
import { ROLE_FROM_API, ROLE_TO_API, type UiRole } from "./account-roles";

// Better Auth requires an email, the form only asks for a username
const EMAIL_DOMAIN = "outix.local";

function toEmail(username: string) {
  return `${username}@${EMAIL_DOMAIN}`;
}

function normalize(username: string) {
  return username.trim().toLowerCase();
}

export async function listAccounts() {
  // POC limit : switch to server-side pagination (limit/offset) if accounts exceed 100
  const { data, error } = await authClient.admin.listUsers({
    query: { limit: 100, sortBy: "createdAt", sortDirection: "asc" },
  });
  if (error) throw new Error(authErrorMessage(error));

  return data.users.map((user) => {
    // The admin plugin's user type does not include the username field
    const { username } = user as typeof user & { username?: string | null };

    return {
      id: user.id,
      name: user.name,
      username: username ?? "",
      role: ROLE_FROM_API[user.role as keyof typeof ROLE_FROM_API] ?? "Visiteur",
    };
  });
}

export async function createAccount(form: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}) {
  const username = normalize(form.username);
  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();

  const { error } = await authClient.admin.createUser({
    email: toEmail(username),
    password: form.password,
    name: `${firstName} ${lastName}`,
    role: ROLE_TO_API[form.role as UiRole],
    data: { username, displayUsername: username, firstName, lastName },
  });
  if (error) throw new Error(authErrorMessage(error));
}

export async function updateAccount(account: {
  id: string;
  username: string;
  role: string;
}) {
  const username = normalize(account.username);

  const { error } = await authClient.admin.updateUser({
    userId: account.id,
    data: { username, displayUsername: username, email: toEmail(username) },
  });
  if (error) throw new Error(authErrorMessage(error));

  const { error: roleError } = await authClient.admin.setRole({
    userId: account.id,
    role: ROLE_TO_API[account.role as UiRole],
  });
  if (roleError) throw new Error(authErrorMessage(roleError));
}

export async function deleteAccount(userId: string) {
  const { error } = await authClient.admin.removeUser({ userId });
  if (error) throw new Error(authErrorMessage(error));
}