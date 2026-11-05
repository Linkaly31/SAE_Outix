
"use client"

import { useEffect, useState } from "react"
import { User, UserCog } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Account } from "@/components/administration/userList"

type ModifyAccountModalProps = {
  account: Account | null
  onClose: () => void
  onSave: (updatedAccount: Account) => void
}

export function ModifyAccountModal({ account, onClose, onSave }: ModifyAccountModalProps) {
  const [form, setForm] = useState({
    username: "",
    role: "Visiteur" as Account["role"],
  })

  useEffect(() => {
    if (account) {
      setForm({
        username: account.username,
        role: account.role,
      })
    }
  }, [account])

  function handleSubmit() {
    if (!account) return

    onSave({
      ...account,
      username: form.username,
      role: form.role,
    })

    onClose()
  }

  return (
    <Dialog
      open={account !== null}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogContent
        className="w-[95vw] max-w-2xl rounded-[24px] p-5 sm:max-w-xl sm:px-12 sm:py-8"
        showCloseButton={false}
      >
        <div className="flex flex-col gap-5">
          <DialogTitle className="mb-5 text-center font-title text-2xl font-bold text-style-green sm:text-4xl">
            Modifications du compte
          </DialogTitle>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="font-body font-bold">
              Identifiant
            </Label>

            <Input
              id="username"
              type="text"
              icon={<User className="size-5 text-muted-foreground" />}
              placeholder="Saisir un identifiant"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

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
                    setForm((prev) => ({
                      ...prev,
                      role: role as Account["role"],
                    }))
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
            onClick={handleSubmit}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}