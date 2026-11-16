"use client";

import { useRouter } from "next/navigation";
import { FileQuestion, Lock, ServerCrash, ShieldAlert, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ErrorType = "non-autorise" | "interdit" | "introuvable" | "serveur";

const ERRORS: Record<ErrorType, { icon: LucideIcon; code: string; title: string; message: string }> = {
  "non-autorise": {
    icon: Lock,
    code: "401",
    title: "Connexion requise",
    message: "Vous devez être connecté pour accéder à cette page.",
  },
  interdit: {
    icon: ShieldAlert,
    code: "403",
    title: "Accès refusé",
    message: "Vous n'avez pas les droits nécessaires pour accéder à cette page.",
  },
  introuvable: {
    icon: FileQuestion,
    code: "404",
    title: "Page introuvable",
    message: "Cette page n'existe pas ou a été déplacée.",
  },
  serveur: {
    icon: ServerCrash,
    code: "500",
    title: "Une erreur est survenue",
    message: "Un problème est survenu de notre côté. Veuillez réessayer plus tard.",
  },
};

export default function ErrorPage({ type }: { type: ErrorType }) {
  const router = useRouter();
  const { icon: Icon, code, title, message } = ERRORS[type];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-style-cream p-4 text-center">
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
        <div className="flex size-20 items-center justify-center rounded-full bg-style-green/10 sm:size-28 lg:size-44">
          <Icon className="size-10 text-style-green sm:size-14 lg:size-24" />
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-start lg:text-left">
          <p className="font-title text-6xl font-bold text-style-green sm:text-7xl lg:text-8xl">
            {code}
          </p>
          <h1 className="text-title font-title font-bold text-style-green-deep">{title}</h1>
        </div>
      </div>

      <p className="text-body font-body max-w-md text-muted-foreground">{message}</p>

      <Button variant="primary" onClick={() => router.push("/accueil")}>
        Retour à l&apos;accueil
      </Button>
    </main>
  );
}