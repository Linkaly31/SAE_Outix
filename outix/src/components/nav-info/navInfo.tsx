
import type { ComponentProps } from "react"
import { cn } from "cn"
import Breadcrumbs from "./breadcrumbs"
import { Button, type ButtonProps } from "../ui/button"
import { Input } from "../ui/input"
import { NavStepper } from "./navStepper"

type NavInfoButton = ButtonProps & {
  label: string
}

type Props = {
  breadcrumbItems?: Array<{ label: string; url: string }>
  title?: string
  subtitle?: string
  input?: ComponentProps<typeof Input>
  buttons?: Array<NavInfoButton>
  stepper?: ComponentProps<typeof NavStepper>
  className?: string
}

function NavInfo({
  breadcrumbItems,
  title,
  subtitle,
  input,
  stepper,
  buttons,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-6 bg-style-green-deep px-6 py-8 pb-[60px] text-white md:grid-cols-[1fr_auto] md:gap-y-10 md:p-10 md:pb-20 lg:pb-[100px]",
        className
      )}
    >
      {/* Left column */}
      <div className="flex min-w-0 flex-col md:col-start-1 md:row-start-1">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumbs items={breadcrumbItems} />
        )}

        {title && (
          <h1 className="mt-4 font-title text-3xl font-bold md:text-4xl">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mt-1 font-body text-lg">
            {subtitle}
          </p>
        )}

        {input && (
          <div className="mt-6 w-full max-w-2xl">
            <Input {...input} />
          </div>
        )}
      </div>

      {/* Right column */}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-row flex-wrap gap-3 md:col-start-2 md:row-start-1 md:flex-col md:gap-5">
          {buttons.map(({ label, className: buttonClassName, ...button }, index) => (
            <Button
              key={`${label}-${index}`}
              variant="accent"
              {...button}
              className={cn("w-auto md:w-full", buttonClassName)}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {/* Stepper */}
      {stepper && stepper.steps.length > 0 && (
        <div className="min-w-0 md:col-span-2 md:row-start-2 md:max-w-3xl xl:max-w-5xl">
          <NavStepper {...stepper} />
        </div>
      )}
    </div>
  )
}

export { NavInfo }