import Breadcrumbs from "./breadcrumbs"

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
};

function NavInfo({ breadcrumbItems, title, subtitle }: Props) {
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
    </div>
  )
}

export { NavInfo }