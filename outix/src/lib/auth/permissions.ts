import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const ac = createAccessControl(defaultStatements);

// Must match the role enum of the user table
export const roles = {
  admin: ac.newRole(adminAc.statements),
  professor: ac.newRole({}),
  visitor: ac.newRole({}),
};