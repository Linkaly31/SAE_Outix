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

// Schéma adapté à l'identifiant (plus large qu'un simple email pour correspondre à "Votre nom identifiant")
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
      {/* 1. Bandeau Vert (Header Enseignant) */}
      <header className="flex justify-between items-center w-full bg-[#3E9F3D] px-6 py-4 md:px-12 text-white">
        <div className="space-y-0.5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Connexion enseignant</h1>
          <p className="text-xs md:text-sm font-light text-emerald-100">
            L'outil pédagogique pour les profs, par les profs
          </p>
        </div>
        {/* Logo a ajouter!!!!!!!!!!!!!!! */}
        
      </header>

      {/* 2. Zone Principale centrée */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg rounded-md shadow-sm">
          <CardContent className="pt-8 px-6 pb-6 md:px-12 space-y-6">
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#3E9F3D]">Connexion</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Champ Identifiant */}
              <div className="space-y-1.5">
                <Label htmlFor="identifier" className="text-sm font-semibold text-gray-700">
                  Identifiant
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Votre nom identifiant"
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus-visible:ring-[#008EFC]"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="text-xs font-medium text-red-500 mt-1">{errors.identifier.message}</p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-1.5">
                <Label htmlFor="password font-semibold text-gray-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="w-full h-10 pl-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus-visible:ring-[#008EFC]"
                    {...register("password")}
                  />
                  {/* Toggle show/hide password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Bouton d'envoi et note */}
              <div className="space-y-4 pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-semibold text-white bg-[#3E9F3D] hover:bg-[#348A33] rounded-lg transition"
                >
                  Se connecter
                </Button>
                
                <p className="text-xs text-center text-gray-800 tracking-wide mt-2">
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