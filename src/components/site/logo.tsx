import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  dark = false,
  showText = true,
  className,
  imgClassName,
  priority = false,
}: {
  dark?: boolean;
  showText?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/rkd-logo.png"
        alt="RKD Reality"
        width={296}
        height={120}
        priority={priority}
        className={cn("h-9 w-auto", imgClassName)}
      />
      {showText && (
        <span
          className={cn(
            "flex flex-col border-l pl-3 leading-none",
            dark ? "border-border" : "border-ivory/25"
          )}
        >
          <span
            className={cn(
              "font-serif text-lg font-medium tracking-tight",
              dark ? "text-foreground" : "text-ivory"
            )}
          >
            RKD Reality
          </span>
          <span
            className={cn(
              "mt-1 text-[0.55rem] uppercase tracking-[0.32em]",
              dark ? "text-muted-foreground" : "text-ivory/55"
            )}
          >
            Land · Trust · Value
          </span>
        </span>
      )}
    </span>
  );
}
