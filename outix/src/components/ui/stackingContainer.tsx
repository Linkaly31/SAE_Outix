import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function StackingContainer({ children}: Props) {
  return (
    <div className="relative -mt-[30px] md:-mt-[40px] lg:-mt-[50px]">
      {children}
    </div>
  )
}