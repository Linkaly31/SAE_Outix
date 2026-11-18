// UI labels <-> Better Auth roles
export const ROLE_TO_API = {
  Admin: "admin",
  Professeur: "professor",
  Visiteur: "visitor",
} as const;

export const ROLE_FROM_API = {
  admin: "Admin",
  professor: "Professeur",
  visitor: "Visiteur",
} as const;

export type UiRole = keyof typeof ROLE_TO_API;