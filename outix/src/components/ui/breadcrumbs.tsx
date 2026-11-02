import Link from "next/link";
import React from "react";

type Props = {
  /**
   * The items that make up the breadcrumb trail
   */
  items: Array<{ label: string; url: string }>;
  /**
   * Additional CSS Classes
   * @default ""
   */
  className?: string;
};

/**
 * Breadcrumb trail displayed inside the NavInfo green section.
 * Maybe add later a truncate feature for long breadcrumb trails, in particular for mobile views.
 */
export const BreadCrumbs: React.FC<Props> = function ({ items, className = "" }) {
  return (
    <nav className={className}>
      <ul className="flex flex-row gap-2 flex-wrap font-body text-sm sm:text-base md:text-lg text-[#FFFFFF]">
        {items.map((item, i) => (
          <li key={item.url} className="flex flex-row gap-2">
            {(i + 1) !== items.length ? (
              <>
                <Link
                  href={item.url}
                  className="hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                  {item.label}
                </Link>
                <span>/</span>
              </>
            ) : (
              <span className="font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;