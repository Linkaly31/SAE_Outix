import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap text-center transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Shadcn
        default: "bg-primary text-primary-foreground hover:bg-primary/80",

        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        
        secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        
        link: "text-primary underline-offset-4 hover:underline",

        // Client : mains buttons
        primary: [
          "bg-style-green text-style-cream",
          "font-button font-bold text-base sm:text-lg",
          "hover:brightness-95",
        ],
        discreet: [
          "bg-style-cream text-style-green border-2 border-style-green",
          "font-button font-bold text-base sm:text-lg",
          "hover:brightness-95",
        ],

        // Secondary button (orange)
        accent: [
          "bg-style-orange text-style-cream",
          "font-button font-bold text-base sm:text-lg",
          "hover:brightness-95",
        ],

        // Action buttons
        edit: [
          "bg-action-edit text-style-cream",
          "font-button font-bold text-base sm:text-lg",
          "hover:brightness-90",
        ],
        delete: [
          "bg-action-delete text-style-cream",
          "font-button font-bold text-base sm:text-lg",
          "hover:brightness-90",
        ],

        // Add element buttons (maybe delete later)
        "add-text": [
          "bg-add-text text-black",
          "font-body font-normal text-base sm:text-lg",
          "hover:brightness-95",
        ],
        "add-image": [
          "bg-add-image text-black",
          "font-body font-normal text-base sm:text-lg",
          "hover:brightness-95",
        ],
        "add-sound": [
          "bg-add-sound text-black",
          "font-body font-normal text-base sm:text-lg",
          "hover:brightness-95",
        ],
        "add-video": [
          "bg-add-video text-black",
          "font-body font-normal text-base sm:text-lg",
          "hover:brightness-95",
        ],
      },
      size: {
        default: "min-h-9 py-2 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        xs: "min-h-6 py-1 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",

        sm: "min-h-8 py-1.5 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",

        lg: "min-h-10 py-2.5 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        icon: "size-8",

        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",

        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",

        "icon-lg": "size-9",
      },
      // Corner radius
      radius: {
        md: "rounded-[10px]",
        lg: "rounded-[20px]",
      },
      fullWidth: {
        true: "w-full",
        false: "px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  radius,
  fullWidth = false,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, radius, fullWidth, className })
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }