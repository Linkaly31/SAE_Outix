"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

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
    <div className="flex flex-col min-h-screen bg-[#F9F9F4]">
      <header className="flex justify-between items-center w-full bg-style-green-deep px-6 py-4 md:px-12">
        <div className="space-y-0.5">
          <h1 className="font-title font-bold text-title text-style-cream">
            Connexion enseignant
          </h1>
          <p className="font-title font-normal text-subtitle text-style-cream">
            L'outil pédagogique pour les profs, par les profs
          </p>
        </div>
        {/* Logo a ajouter!!!!!!!!!!!!!!! */}
        
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg rounded-md shadow-sm bg-ui-card">
          <CardContent className="pt-8 px-6 pb-6 md:px-12 space-y-6">
            
            <div className="text-center">
              <h2 className="font-title font-bold text-title text-style-green">
                Connexion
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Identifier area */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="identifier"
                  className="font-body font-bold text-label text-ui-label"
                >
                  Identifiant
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Votre identifiant"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg bg-white text-gray-800 font-body font-normal text-input-label placeholder:text-ui-placeholder focus-visible:ring-style-green"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="text-xs font-medium text-red-500 mt-1">{errors.identifier.message}</p>
                )}
              </div>

              {/* Password Area */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="font-body font-bold text-label text-ui-label"
                >
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="w-full h-10 pl-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-800 font-body font-normal text-input-label placeholder:text-ui-placeholder focus-visible:ring-style-green"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-ui-placeholder hover:brightness-90"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Send button and text */}
              <div className="space-y-4 pt-2">
                <Button type="submit" variant="primary" radius="md" fullWidth className="h-11">
                  Se connecter
                </Button>
                
                <p className="font-body font-normal text-body text-center tracking-wide mt-2">
                  Vos identifiants sont utilisés pour accéder à votre espace pédagogique.
                </p>
              </div>

            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}