// ─── components/ui/Glass.tsx ──────────────────────────────────────────────
// Atomic glassmorphism surface. The foundation for every card in the portfolio.
//
// Usage:
//   <Glass hover className="p-8">content</Glass>
//   <Glass className="p-6 md:p-10 h-full">content</Glass>

import { cn } from "@/lib/utils";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable hover glow + border brighten + shadow lift */
  hover?: boolean;
  children: React.ReactNode;
}

export default function Glass({
  children,
  hover = false,
  className,
  ...props
}: GlassProps) {
  return (
    <div
      className={cn(
        // Base glass
        "rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl",
        // Interactive variant
        hover && [
          "transition-all duration-500 cursor-pointer",
          "hover:bg-white/[0.06] hover:border-white/[0.12]",
          "hover:shadow-2xl hover:shadow-white/[0.02]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}