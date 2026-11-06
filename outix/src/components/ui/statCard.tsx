import type { LucideIcon } from "lucide-react"

type StatCardProps = {
  Icon: LucideIcon
  color: string
  value: number
  label: string
}

export function StatCard({ Icon, color, value, label }: StatCardProps) {
  return (
    <div className="flex w-full max-w-[300px] items-center gap-5 rounded-xl bg-white p-5">
      <div className="rounded-lg p-4" style={{ backgroundColor: `${color}50` }}>
        <Icon size={45} color={color} />
      </div>

      <div>
        <p className="text-4xl font-title font-bold">{value}</p>
        <p className="font-button text-base">{label}</p>
      </div>
    </div>
  )
}