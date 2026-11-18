type AuthError = {
  code?: string;
  status?: number;
};

const MESSAGES: Record<string, string> = {
  INVALID_USERNAME_OR_PASSWORD: "Identifiant ou mot de passe incorrect.",
  USER_ALREADY_EXISTS: "Cet identifiant est déjà utilisé.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Cet identifiant est déjà utilisé.",
  USERNAME_IS_ALREADY_TAKEN: "Cet identifiant est déjà utilisé.",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 8 caractères.",
  PASSWORD_TOO_LONG: "Le mot de passe est trop long.",
  BANNED_USER: "Ce compte est suspendu.",
  YOU_CANNOT_REMOVE_YOURSELF: "Vous ne pouvez pas supprimer votre propre compte.",
  ADMIN_ACCOUNT_PROTECTED: "Un compte administrateur ne peut pas être modifié ni supprimé.",
};

export function authErrorMessage(error: AuthError | null | undefined) {
  if (error?.code && MESSAGES[error.code]) return MESSAGES[error.code];
  if (error?.status === 403) return "Vous n'avez pas les droits nécessaires.";
  return "Une erreur est survenue. Veuillez réessayer.";
}