import { Fragment } from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

type NavStepperStep = {
  label: string;
};

type Props = {
  /** Steps to display, in order */
  steps: Array<NavStepperStep>;
  /** Current step. Steps before it are shown as completed */
  currentStep: number;
  /** Additional CSS classes applied to the root element */
  className?: string;
};

function NavStepper({ steps, currentStep, className }: Props) {
  return (
    <ol className={cn("flex flex-col gap-1 md:flex-row md:items-center md:gap-3 lg:gap-4 xl:gap-5", className)}>
      {steps.map(({ label }, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep
        const isLast = stepNumber === steps.length

        return (
          /* Groups step + connector without extra DOM, and holds the key */
          <Fragment key={`${label}-${index}`}>
            {/* Indicator + label */}
            <li
              aria-current={isActive ? "step" : undefined}
              className="flex items-center gap-3 xl:gap-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white font-title text-base font-bold text-style-green-deep xl:size-14 xl:text-2xl">
                {isCompleted ? (
                  <CheckIcon className="size-6 md:size-5 xl:size-8" strokeWidth={3} />
                ) : (
                  stepNumber
                )}
              </span>
              <span className="font-body text-base md:text-nowrap xl:text-2xl">
                {label}
              </span>
            </li>

            {/* Connector: vertical below md, horizontal from md, all connectors share the same length */}
            {!isLast && (
              <li
                aria-hidden="true"
                className="ml-5 h-6 w-0.5 bg-white md:ml-0 md:h-1 md:w-auto md:min-w-6 md:flex-1 xl:h-[0.2rem] xl:min-w-8"
              />
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}

export { NavStepper }