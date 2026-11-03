import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

type InputProps = React.ComponentProps<"input"> & {
  /** Icon displayed on the left inside the input (e.g. a search icon) */
  icon?: React.ReactNode;
  /** Additional CSS Classes applied to the wrapper (only used with an icon) */
  wrapperClassName?: string;
};

function Input({ className, type, icon, wrapperClassName, ...props }: InputProps) {
  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-1 font-body text-sm font-normal text-black transition-colors outline-none placeholder:text-ui-placeholder focus-visible:ring-2 focus-visible:ring-style-green disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 sm:text-base",
        icon && "pl-10",
        className
      )}
      {...props}
    />
  )

  if (!icon) return input

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-black">
        {icon}
      </span>
      {input}
    </div>
  )
}

export { Input }