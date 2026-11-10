import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva([
  // General CSS
  "inline-flex items-center font-body font-bold whitespace-nowrap has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  // Mobile 
  "rounded-2xl px-4 py-1 text-xs",
  // Tablet
  "sm:rounded-3xl px-4 py-1 sm:text-sm",
  // Desktop
  "lg:rounded-4xl lg:px-5 lg:py-1.5 lg:text-base",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        blue: "text-[#1060BC] bg-[#1060BC]/15",
        green: "text-[#3BA040] bg-[#3BA040]/15",
        orange: "text-[#FD992D] bg-[#FD992D]/15",
        red: "text-[#D92D3F] bg-[#D92D3F]/15"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  color,
  render,
  ...props
}: useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { color?: string }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        style: color ? { color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` } : undefined
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }