import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to conditionally join class names together.
 * It uses `clsx` to handle conditional classes and `tailwind-merge`
 * to intelligently merge Tailwind CSS classes without style conflicts.
 * This is a common pattern in projects using shadcn/ui.
 *
 * @param inputs - A list of class values to be combined.
 *   This can include strings, objects with boolean values, or arrays.
 * @returns A single string of merged and optimized class names.
 * @example
 * cn("p-4", "font-bold", { "bg-red-500": hasError });
 * // => "p-4 font-bold bg-red-500" (if hasError is true)
 *
 * cn("px-2 py-1 bg-red-500", "p-4");
 * // => "p-4 bg-red-500" (tailwind-merge resolves conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
