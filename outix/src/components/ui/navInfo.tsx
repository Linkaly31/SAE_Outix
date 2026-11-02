import Link from "next/link"
import Breadcrumbs from "./breadcrumbs"
import { Button } from "./button"

type NavInfoButton = {
  label: string;
  /** If set, the button navigates to this URL */
  url?: string;
  /** Used for popups, redirects or any other action */
  onClick?: () => void;
};

type Props = {
  /**
   * Breadcrumb trail (hidden if missing or empty)
   */
  breadcrumbItems?: Array<{ label: string; url: string }>;
  /**
   * Main title (hidden if missing)
   */
  title?: string;
  /**
   * Text displayed under the title (hidden if missing)
   */
  subtitle?: string;
  /**
   * Buttons displayed in the button section (hidden if missing or empty)
   */
  buttons?: Array<NavInfoButton>;
  /**
   * Additional CSS Classes applied to every button
   * @default ""
   */
  buttonClassName?: string;
};

function NavInfo({
  breadcrumbItems,
  title,
  subtitle,
  buttons,
  buttonClassName = "",
}: Props) {
  return (
    <div className="flex flex-col gap-1 text-ui-card sm:gap-2">
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumbs items={breadcrumbItems} />
      )}

      {title && (
        <h1 className="font-title text-xl font-bold sm:text-2xl md:text-4xl">
          {title}
        </h1>
      )}

      {subtitle && (
        <p className="font-body text-sm sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}

      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {buttons.map((button) =>
            button.url ? (
              <Button
                key={button.label}
                variant="accent"
                className={buttonClassName}
                render={<Link href={button.url} />}
                nativeButton={false}
              >
                {button.label}
              </Button>
            ) : (
              <Button
                key={button.label}
                variant="accent"
                className={buttonClassName}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export { NavInfo }