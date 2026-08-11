import type {ReactElement, SVGProps} from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({children, ...props}: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconNaturalPool(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 24c1-7 8-12 16-11 7 1 13 5 14 12 1 6-4 11-12 12-9 1-19-5-18-13Z" />
      <path d="M16 24c2 1.4 4.5 2 8 2s6-.6 8-2" />
      <path d="M18 28.5c1.6 1 3.6 1.4 6 1.4s4.4-.4 6-1.4" />
      <path d="M8 16c1.5-3 4-4 6-3M37 17c2-2.5 5-2 6 0" />
      <path d="M11 14c.4-2.4 2.2-4 4.2-3.6M35 13.5c1.6-.8 3.8 0 4.2 2" />
    </Svg>
  );
}

export function IconPool(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="16" width="34" height="18" rx="2" />
      <path d="M12 23c2 1.4 4 1.4 6 0s4-1.4 6 0 4 1.4 6 0 4-1.4 6 0" />
      <path d="M12 28c2 1.4 4 1.4 6 0s4-1.4 6 0 4 1.4 6 0 4-1.4 6 0" />
      <path d="M33 16v-4h6v4" />
      <path d="M33 12h6" />
    </Svg>
  );
}

export function IconOverheadTank(props: IconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="24" cy="12" rx="11" ry="4" />
      <path d="M13 12v10c0 2.3 5 4 11 4s11-1.7 11-4V12" />
      <path d="M17 26v10M31 26v10" />
      <path d="M14 36h20" />
      <path d="M24 26v5" />
      <path d="M21 18h6" />
    </Svg>
  );
}

export function IconBorewell(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="17" y="8" width="14" height="9" rx="1.4" />
      <circle cx="21.5" cy="12.5" r="1.3" />
      <path d="M24 17v5" />
      <path d="M20 22h8" />
      <path d="M24 22v16" />
      <path d="M21 28h6M21 33h6M21 38h6" />
      <path d="M12 22h8" />
      <path d="M12 22c-2 2-3 5-2 8" />
    </Svg>
  );
}

export function IconSump(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 20h32" />
      <path d="M12 20v14c0 2 5 4 12 4s12-2 12-4V20" />
      <rect x="20" y="16" width="8" height="5" rx="1" />
      <path d="M18 28c2 1.2 4 1.2 6 0s4-1.2 6 0" />
    </Svg>
  );
}

export function IconStreetLight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 42h10" />
      <path d="M21 42V14" />
      <path d="M21 14c0-5 4.5-8 10-8 3 0 6 1.2 7.5 3" />
      <path d="M32 9.2c2.4 1.4 3.8 3.6 3.8 6.2 0 4-3.2 6.6-6.2 6.6s-5.4-2.6-5.4-6.2c0-1.4.4-2.7 1.2-3.8" />
      <path d="M29.4 22.2v3.2" />
      <path d="M27.2 25.4h6.4" />
    </Svg>
  );
}

export function IconWaterTap(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 12h12a6 6 0 0 1 6 6v4" />
      <path d="M14 12V9h6v3" />
      <path d="M32 22h4v4h-8v-2a2 2 0 0 1 4-2Z" />
      <path d="M30 30c0 2.2-1.8 3.5-2.8 4.6a2 2 0 0 0 2.8 3.2 2 2 0 0 0 2.8-3.2C31.8 33.5 30 32.2 30 30Z" />
    </Svg>
  );
}

export const CUSTOM_FEATURE_ICONS: Record<
  string,
  (props: IconProps) => ReactElement
> = {
  "natural-pool": IconNaturalPool,
  pool: IconPool,
  tank: IconOverheadTank,
  borewell: IconBorewell,
  sump: IconSump,
  "water-supply": IconWaterTap,
  lighting: IconStreetLight,
};
