
"use client"

import { useState } from "react"
import { Check, Lock, User, UserCog, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FIELDS = [
  { name: "lastName", label: "Nom de l'utilisateur", placeholder: "Saisir le nom de l'utilisateur", icon: User, type: "text" },
  { name: "firstName", label: "Prénom de l'utilisateur", placeholder: "Saisir le prénom de l'utilisateur", icon: User, type: "text" },
  { name: "username", label: "Identifiant", placeholder: "Saisir un identifiant", icon: User, type: "text" },
  { name: "password", label: "Mot de passe", placeholder: "Saisir un mot de passe", icon: Lock, type: "password" },
] as const

const EMPTY_FORM = {
  lastName: "",
  firstName: "",
  username: "",
  password: "",
  role: "",
}

type CreateAccountModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: typeof EMPTY_FORM) => Promise<void>
}

export function CreateAccountModal({ open, onClose, onSubmit }: CreateAccountModalProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [success, setSuccess] = useState(false)

  const isValid = Object.values(form).every(
    (value) => value.trim() !== ""
  )

  function handleClose() {
    onClose()
    setForm(EMPTY_FORM)
    setSuccess(false)
  }

  async function handleSubmit() {
    await onSubmit(form)
    setSuccess(true)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent
        className="w-[95vw] max-w-2xl rounded-[24px] p-5 sm:max-w-xl sm:px-12 sm:py-8"
        showCloseButton={false}
      >
        {!success ? (
          <div className="flex flex-col gap-5">
            <DialogTitle className="mb-5 text-center font-title text-2xl font-bold text-style-green sm:text-4xl">
              Création d'un compte
            </DialogTitle>

            {FIELDS.map(({ name, label, placeholder, icon: Icon, type }) => (
              <div key={name} className="flex flex-col gap-2">
                <Label htmlFor={name} className="font-body font-bold">
                  {label}
                </Label>

                <Input
                  id={name}
                  type={type}
                  icon={<Icon className="size-5 text-muted-foreground" />}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={(e) =>
                    setForm({ ...form, [name]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <Label className="font-body font-bold">
                Rôle du compte
              </Label>

              <div className="relative">
                <UserCog className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                <Select
                  value={form.role}
                  onValueChange={(role) => {
                    if (role) {
                      setForm((prev) => ({ ...prev, role }))
                    }
                  }}
                >
                  <SelectTrigger className="h-10 w-full pl-10 font-body text-sm font-normal text-black sm:text-base">
                    <SelectValue placeholder="Choisir un rôle pour le compte" />
                  </SelectTrigger>

                  <SelectContent align="start" sideOffset={4} className="w-[calc(var(--anchor-width)-2.5rem)] translate-x-10">
                    <SelectItem value="Professeur" className="font-body text-sm sm:text-base">
                      Professeur
                    </SelectItem>

                    <SelectItem value="Visiteur" className="font-body text-sm sm:text-base">
                      Visiteur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Créer le compte
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <div className="flex size-30 items-center justify-center rounded-full bg-style-green">
              <Check className="size-20 text-white" strokeWidth={3} />
            </div>

            <DialogTitle className="w-full font-title text-2xl font-bold sm:text-4xl">
              Compte créé
            </DialogTitle>

            <p className="font-body text-sm sm:text-base">
              Le compte de {form.firstName} {form.lastName} a bien été créé. Ses identifiants ont été envoyés à :
            </p>

            <div className="flex w-fit max-w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-[#BCD4F0] px-3 py-3 sm:px-5 sm:py-4">
              <Mail className="size-5 shrink-0 text-[#1060BC]" />
              <span className="break-all font-body text-sm text-[#1060BC] sm:text-base">
                exemple@gmail.com
              </span>
            </div>

            <Button
              variant="primary"
              onClick={handleClose}
              className="w-full text-sm sm:text-base"
            >
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}