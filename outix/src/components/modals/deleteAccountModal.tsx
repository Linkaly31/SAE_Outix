
"use client"

import { Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Account } from "@/components/administration/userList"

const roleVariants = {
  Admin: "admin",
  Professeur: "teacher",
  Visiteur: "visitor",
} as const

type DeleteAccountModalProps = {
  account: Account | null
  onClose: () => void
  onConfirm: (account: Account) => void
}

export function DeleteAccountModal({ account, onClose, onConfirm }: DeleteAccountModalProps) {
  return (
    <Dialog open={!!account} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-2xl rounded-[24px] p-5 sm:max-w-xl sm:px-12 sm:py-8" showCloseButton={false}>
        {account && (
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <div className="flex size-30 items-center justify-center rounded-full bg-[#D92D3F] sm:size-30">
              <Trash2 className="size-20 text-white sm:size-20" />
            </div>

            <DialogTitle className="w-full font-title text-2xl font-bold sm:text-4xl">
              Supprimer ce compte ?
            </DialogTitle>

            <p className="font-body text-sm sm:text-base">
              Cette action est définitive : le compte ne pourra plus se connecter à Outix.
            </p>

            {/* Account informations */}
            <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-xl bg-[#F6F6EE] px-3 py-3 text-left sm:px-5 sm:py-4">
              <div className="min-w-0 flex-1">
                <p className="break-words font-body text-sm sm:text-base">
                  {account.name}
                </p>
                <p className="break-all font-body text-xs sm:text-sm">
                  {account.username}
                </p>
              </div>

              <Button variant={roleVariants[account.role]} className="w-24 shrink-0 text-xs sm:w-30 sm:text-sm">
                {account.role}
              </Button>
            </div>

            {/* Action buttons */}
            <div className="flex w-full justify-center gap-3 pt-2 sm:gap-5">
              <Button variant="discreet" onClick={onClose} className="w-28 shrink-0 text-sm sm:w-40 sm:text-base">
                Fermer
              </Button>

              <Button variant="delete" onClick={() => onConfirm(account)} className="w-28 shrink-0 text-sm sm:w-40 sm:text-base">
                <Trash2 className="size-4" />
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}