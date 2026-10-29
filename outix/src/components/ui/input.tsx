import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-1 font-body text-sm font-normal transition-colors outline-none placeholder:text-ui-placeholder focus-visible:ring-2 focus-visible:ring-style-green disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 sm:text-base",
        className
      )}
      {...props}
    />
  )
}

export { Input }