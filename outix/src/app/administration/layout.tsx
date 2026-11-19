import ErrorPage from "@/components/error/errorPage";
import { requireSession } from "@/lib/auth/session";

export default async function AdministrationLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  if (session.user.role !== "admin") {
    return <ErrorPage type="interdit" />;
  }
  return children;
}