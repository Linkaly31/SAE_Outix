"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  identifier: z.string().min(3, { message: "L'identifiant doit contenir au moins 3 caractères." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
})

type LoginForm = z.infer<typeof formSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
  })

  function onSubmit(values: LoginForm) {
    console.log("Tentative de connexion avec :", values)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F4] md:flex-row">
      <aside className="flex flex-col justify-between gap-10 bg-style-green-deep px-6 py-6 sm:py-8 md:w-1/2 md:gap-16 md:px-10 md:py-10">
        <div className="flex items-center gap-6">
          {/* Add logo later */}
          <span className="font-title text-3xl font-bold text-style-cream">
            OUTIX
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="font-title text-2xl font-bold text-style-cream sm:text-3xl">
            L&apos;outil pédagogique pour les profs, par les profs
          </h1>
          <p className="font-body text-body font-normal text-style-cream">
            Cours, exercices et suivi de vos classes, au même endroit.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:w-1/2">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="space-y-5 text-center sm:space-y-8 md:space-y-10">
            <h2 className="font-title text-2xl font-bold text-style-green sm:text-3xl">
              Connexion enseignant
            </h2>
            <p className="font-body text-body tracking-wide">
              Vos identifiants donnent accès à votre espace pédagogique.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Identifier area */}
            <div className="space-y-2">
              <Label
                htmlFor="identifier"
                className="font-body text-sm font-bold text-ui-label sm:text-base"
              >
                Identifiant
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-placeholder sm:h-5 sm:w-5" />

                <Input
                  id="identifier"
                  type="text"
                  placeholder="Votre identifiant"
                  className="pl-9 pr-3 text-gray-800 sm:pl-10"
                  {...register("identifier")}
                />
              </div>

              {errors.identifier && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.identifier.message}</p>
              )}
            </div>

            {/* Password Area */}
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-body text-sm font-bold text-ui-label sm:text-base"
                >
                  Mot de passe
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-placeholder sm:h-5 sm:w-5" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="pl-9 pr-10 text-gray-800 sm:pl-10"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-ui-placeholder hover:brightness-90"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="font-body text-sm text-style-green underline sm:text-base"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Send button and text */}
            <div className="space-y-3 pt-1 sm:space-y-4 sm:pt-2">
              <Button type="submit" variant="primary" radius="md" fullWidth className="h-11 gap-2">
                Se connecter
                <ArrowRight className="h-6 w-6 stroke-[3]" />
              </Button>

              <p className="mt-2 text-center font-body text-body tracking-wide">
                <a href="#" className="text-style-green underline">
                  Pas de compte ? Contactez un administrateur.
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}