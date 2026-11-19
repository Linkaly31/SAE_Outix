import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"
import { X } from "lucide-react"

type InputProps = React.ComponentProps<"input"> & {
  /** Icon displayed on the left inside the input (e.g. a search icon) */
  icon?: React.ReactNode;
  /** Additional CSS Classes applied to the wrapper (only used with an icon) */
  wrapperClassName?: string;
};

function Input({ className, type, icon, wrapperClassName, value, onChange, ...props }: InputProps) {
  const handleClear = () => {
    if (!onChange) return

    const event = {
      target: { value: "" },
      currentTarget: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>

    onChange(event)
  }

  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-1 pr-10 font-body text-sm font-normal text-black transition-colors outline-none placeholder:text-ui-placeholder focus-visible:ring-2 focus-visible:ring-style-green disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 sm:text-base",
        "[&::-webkit-search-cancel-button]:appearance-none",
        icon && "pl-10",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    />
  )

  if (!icon && type !== "search") { return input }

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      {icon && (
        <span className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center text-black">
          {icon}
        </span>
      )}

      {input}

      {type === "search" &&
        typeof value === "string" &&
        value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="absolute inset-y-0 right-3 z-10 flex items-center text-red-500 transition-colors hover:text-red-700"
          >
            <X size={20} />
          </button>
        )}
    </div>
  )
}

export { Input }