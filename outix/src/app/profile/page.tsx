"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 1. Séparation stricte des schémas de validation
const profileSchema = z.object({
  lastName: z.string().min(2, "Le nom est requis."),
  firstName: z.string().min(2, "Le prénom est requis."),
  email: z.string().email("Adresse email invalide."),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Mot de passe actuel requis."),
  newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  confirmPassword: z.string().min(6, "Veuillez confirmer le mot de passe."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"], // Cible l'erreur sur le champ de confirmation
})

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  // Gestion indépendante des états d'affichage des mots de passe
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Initialisation du Formulaire 1 : Profil
  const { 
    register: registerProfile, 
    handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors } 
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastName: "Dumas",
      firstName: "Alexandre",
      email: "dumas-alexandre@example.com",
    }
  })

  // Initialisation du Formulaire 2 : Sécurité
  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors } 
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema)
  })

  function onProfileSubmit(values: ProfileForm) {
    console.log("Mise à jour profil :", values)
  }

  function onPasswordSubmit(values: PasswordForm) {
    console.log("Changement mot de passe :", values)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F4]">
      {/* Bandeau Vert (Header commun) */}
      <header className="flex justify-between items-center w-full bg-style-green-deep px-6 py-4 md:px-12 text-white">
        <div className="space-y-0.5">
          <h1 className="font-title text-xl md:text-2xl font-bold tracking-tight">Gérer mon profil</h1>
          <p className="font-body text-xs md:text-sm font-light text-emerald-100">
            L'outil pédagogique pour les profs, par les profs
          </p>
        </div>
        {/* INSERT LOGO !!!!!!!!!!*/}
      </header>

      <main className="flex-1 flex justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl bg-white rounded-md shadow-sm p-8 md:p-12">
          
          {/* Profile Card Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-2xl font-title font-bold text-gray-900">Alexandre Dumas</h2>
              <p className="text-gray-600 font-body">adumas</p>
            </div>
            <span className="text-gray-600 font-body font-medium">Utilisateur</span>
          </div>

          <div className="space-y-12">
            
            {/* Personal Information Form */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-title">Informations personnelles</h3>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-body">
                      Nom du professeur
                    </Label>
                    <Input id="lastName" className="font-body" {...registerProfile("lastName")} />
                    {profileErrors.lastName && <p className="text-xs font-body text-red-500">{profileErrors.lastName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-body">
                      Prénom du professeur
                    </Label>
                    <Input id="firstName" className="font-body" {...registerProfile("firstName")} />
                    {profileErrors.firstName && <p className="text-xs font-body text-red-500">{profileErrors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body">
                      E-mail
                    </Label>
                    <Input id="email" className="font-body" {...registerProfile("email")} />
                    {profileErrors.email && <p className="text-xs font-body text-red-500">{profileErrors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="identifiant" className="font-body">
                      Identifiant
                    </Label>
                    <Input id="identifiant" value="adumas" disabled className="bg-gray-50 text-gray-500 cursor-not-allowed font-body" />
                    <p className="text-[10px] text-gray-500 mt-1 font-body">
                      Non modifiable, contactez un administrateur.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="primary" className="px-8">
                    Enregistrer
                  </Button>
                </div>
              </form>
            </section>

            {/* Password Form */}
            <section>
              <h3 className="font-title text-lg font-bold text-gray-900 mb-6">Mot de passe</h3>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="font-body">Mot de passe</Label>
                  <div className="relative">
                    <Input id="currentPassword" className="font-body" type={showCurrent ? "text" : "password"} placeholder="Saisissez votre mot de passe actuel" {...registerPassword("currentPassword")} />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="font-body absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                      {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && <p className="text-xs font-body text-red-500">{passwordErrors.currentPassword.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="font-body">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input id="newPassword" className="font-body" type={showNew ? "text" : "password"} placeholder="Saisissez votre nouveau mot de passe" {...registerPassword("newPassword")} />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="font-body absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && <p className="text-xs font-body text-red-500">{passwordErrors.newPassword.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-body">Confirmer</Label>
                    <div className="relative">
                      <Input id="confirmPassword" className="font-body" type={showConfirm ? "text" : "password"} placeholder="Confirmez votre nouveau mot de passe" {...registerPassword("confirmPassword")} />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="font-body absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && <p className="text-xs font-body text-red-500">{passwordErrors.confirmPassword.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="primary" className="px-8">
                    Changer le mot de passe
                  </Button>
                </div>
              </form>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}