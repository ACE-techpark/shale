export type LocalImage = {
  src: `/images/${string}`;
  alt: { ka: string; en: string };
  position?: string;
  mobilePosition?: string;
};

export type GalleryPhoto = {
  src: `/images/${string}`;
  alt: { ka: string; en: string };
};

export type NavigationItem = { href: `#${string}` };
export type ContactKind = "facebook" | "instagram" | "whatsapp" | "phone";
export type SiteConfig = {
  [key: string]: unknown;
  navigation: NavigationItem[];
  hero: { image: LocalImage; [key: string]: unknown };
  about: { image: LocalImage; [key: string]: unknown };
  cottages: { id: "01" | "02"; details: boolean; image: LocalImage }[];
  occasions: { icon: "leaf" | "cake" | "sparkles" }[];
  gallery: { koteji: GalleryPhoto[]; saxli: GalleryPhoto[] };
  owner: { image: LocalImage; [key: string]: unknown };
  contacts: {
    facebook: string | null;
    instagram: string | null;
    whatsappNumber: string | null;
    phone: string | null;
  };
  location: {
    mapUrl: string | null;
    coordinates: { latitude: number; longitude: number } | null;
  };
};
