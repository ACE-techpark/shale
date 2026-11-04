import type { ReactNode, SVGProps } from "react";
export type IconName =
  | "arrow"
  | "arrowUp"
  | "down"
  | "pin"
  | "leaf"
  | "cake"
  | "sparkles"
  | "photo"
  | "person"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "phone"
  | "menu"
  | "close"
  | "sun"
  | "moon";
const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  arrowUp: <path d="M6 18 18 6M6 6h12v12" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  leaf: (
    <path d="M20 4c-1 9-1 15-9 15a6 6 0 0 1-6-6C5 5 13 6 20 4ZM4 21 15 10" />
  ),
  cake: (
    <path d="M4 13h16v7H4Zm0 3c2 2 3-2 5 0s3 2 5 0 3 2 6 0M8 13V9m8 4V9m-4 4V7M7 5l1-2 1 2M15 5l1-2 1 2M11 3l1-2 1 2" />
  ),
  sparkles: (
    <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4M3 18v4m-2-2h4" />
  ),
  photo: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="m3 17 5-5 4 4 4-6 5 7" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  facebook: (
    <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-4 0-5 2-5 5v2H7v4h3v8" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.3A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="m8 7-1 2c1 4 3 6 7 7l2-2-3-2-1 1c-1.5-.5-2.5-1.5-3-3l1-1-2-2Z" />
    </>
  ),
  phone: (
    <path d="m7 3-4 2c0 9 7 16 16 16l2-4-5-3-2 2a14 14 0 0 1-6-6l2-2-3-5Z" />
  ),
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
};
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
