import { cn } from "@/lib/utils"

/**
 * A placeholder component to display while content is loading.
 * It shows a shimmering, animated shape.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
