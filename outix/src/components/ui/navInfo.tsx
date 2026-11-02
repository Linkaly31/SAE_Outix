import type { ComponentProps } from "react"
import { cn } from "cn"
import Breadcrumbs from "./breadcrumbs"
import { Button, type ButtonProps } from "./button"
import { Input } from "./input"

type NavInfoButton = ButtonProps & {
  label: string;
};

type Props = {
  /** Breadcrumb trail (hidden if missing or empty) */
  breadcrumbItems?: Array<{ label: string; url: string }>;
  /** Main title (hidden if missing) */
  title?: string;
  /** Text displayed under the title (hidden if missing) */
  subtitle?: string;
  /** Single optional input (search bar, filter...), accepts any Input prop */
  input?: ComponentProps<typeof Input>;
  /** Buttons: side by side on mobile, stacked on the right from md, accepts any Button prop and a label */
  buttons?: Array<NavInfoButton>;
  /** Additional CSS classes applied to the root element */
  className?: string;
};

function NavInfo({
  breadcrumbItems,
  title,
  subtitle,
  input,
  buttons,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-6 bg-style-green-deep px-6 py-8 text-white md:flex-row md:justify-between md:px-10 md:py-10", className)}>
      {/* Left column */}
      <div className="flex flex-1 flex-col">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumbs items={breadcrumbItems} />
        )}

        {title && (
          <h1 className="mt-4 font-title text-3xl font-bold md:text-4xl">{title}</h1>
        )}

        {subtitle && <p className="mt-1 font-body text-lg">{subtitle}</p>}

        {input && (
          <div className="mt-6 w-full max-w-2xl">
            <Input {...input} />
          </div>
        )}
      </div>

      {/* Right column */}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-row flex-wrap gap-3 md:flex-col md:gap-5">
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
    </div>
  )
}

export { NavInfo }