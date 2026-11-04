import type { SiteConfig } from "@/types/site";

// დაუდასტურებელი მონაცემები დატოვეთ null. ფოტო დაამატეთ მხოლოდ public/images/-ში შენახვის შემდეგ.
export const site: SiteConfig = {
  navigation: [
    { href: "#home" },
    { href: "#about" },
    { href: "#cottages" },
    { href: "#occasions" },
    { href: "#gallery" },
    { href: "#location" },
    { href: "#contact" },
  ],
  hero: {
    image: {
      src: "/images/hero/01-aerial.jpg",
      alt: { ka: "ტყეში მდებარე ორი სახლის დრონით გადაღებული ხედი", en: "Drone view of two houses in the forest" },
      position: "center",
    },
  },
  about: {
    image: {
      src: "/images/hero/01-aerial.jpg",
      alt: { ka: "ტყეში მდებარე ორი სახლის დრონით გადაღებული ხედი", en: "Drone view of two houses in the forest" },
      position: "center",
    },
  },
  cottages: [
    {
      id: "01",
      details: true,
      image: {
        src: "/images/koteji/01-exterior.jpg",
        alt: { ka: "კოტეჯის გარე ხედი", en: "Cottage exterior" },
        position: "center",
      },
    },
    {
      id: "02",
      details: true,
      image: {
        src: "/images/saxli/01-exterior-summer.jpg",
        alt: { ka: "სახლი ზაფხულში", en: "Large house in summer" },
        position: "center",
      },
    },
  ],
  occasions: [
    { icon: "leaf" },
    { icon: "cake" },
    { icon: "sparkles" },
  ],
  gallery: {
    koteji: [
      { src: "/images/koteji/01-exterior.jpg", alt: { ka: "კოტეჯის გარე ხედი", en: "Cottage exterior" } },
      { src: "/images/koteji/02-glass-facade.jpg", alt: { ka: "კოტეჯის შუშის ფასადი", en: "Cottage glass facade" } },
      { src: "/images/koteji/03-exterior-hill.jpg", alt: { ka: "კოტეჯი გორაკზე", en: "Cottage on a hill" } },
      { src: "/images/koteji/04-exterior-forest.jpg", alt: { ka: "კოტეჯი ტყის გარემოცვაში", en: "Cottage surrounded by forest" } },
      { src: "/images/koteji/05-terrace.jpg", alt: { ka: "კოტეჯის ტერასა", en: "Cottage terrace" } },
      { src: "/images/koteji/06-terrace-sunset.jpg", alt: { ka: "კოტეჯის ტერასა მზის ჩასვლისას", en: "Cottage terrace at sunset" } },
      { src: "/images/koteji/07-walkway-sunset.jpg", alt: { ka: "კოტეჯისკენ მიმავალი ბილიკი მზის ჩასვლისას", en: "Path to the cottage at sunset" } },
      { src: "/images/koteji/08-sunset-sky.jpg", alt: { ka: "მზის ჩასვლის ცა კოტეჯთან", en: "Sunset sky by the cottage" } },
      { src: "/images/koteji/09-interior-window.jpg", alt: { ka: "კოტეჯის ინტერიერი ფანჯარასთან", en: "Cottage interior by a window" } },
      { src: "/images/koteji/10-dining.jpg", alt: { ka: "კოტეჯის სასადილო სივრცე", en: "Cottage dining area" } },
      { src: "/images/koteji/11-kitchen.jpg", alt: { ka: "კოტეჯის სამზარეულო", en: "Cottage kitchen" } },
      { src: "/images/koteji/12-bedroom.jpg", alt: { ka: "კოტეჯის საძინებელი", en: "Cottage bedroom" } },
      { src: "/images/koteji/13-bathroom-jacuzzi.jpg", alt: { ka: "კოტეჯის სააბაზანო ჯაკუზით", en: "Cottage bathroom with jacuzzi" } },
    ],
    saxli: [
      { src: "/images/saxli/01-exterior-summer.jpg", alt: { ka: "დიდი სახლის გარე ხედი ზაფხულში", en: "Large house exterior in summer" } },
      { src: "/images/saxli/02-exterior-winter.jpg", alt: { ka: "დიდი სახლის გარე ხედი ზამთარში", en: "Large house exterior in winter" } },
      { src: "/images/saxli/03-living-room-fireplace.jpg", alt: { ka: "დიდი სახლის მისაღები ბუხრით", en: "Large house living room with fireplace" } },
      { src: "/images/saxli/04-living-room-winter.jpg", alt: { ka: "დიდი სახლის მისაღები ზამთარში", en: "Large house living room in winter" } },
      { src: "/images/saxli/05-dining-summer.jpg", alt: { ka: "დიდი სახლის სასადილო ზაფხულში", en: "Large house dining room in summer" } },
      { src: "/images/saxli/06-dining-winter.jpg", alt: { ka: "დიდი სახლის სასადილო ზამთარში", en: "Large house dining room in winter" } },
      { src: "/images/saxli/07-kitchen.jpg", alt: { ka: "დიდი სახლის სამზარეულო", en: "Large house kitchen" } },
      { src: "/images/saxli/08-bedroom-1.jpg", alt: { ka: "დიდი სახლის პირველი საძინებელი", en: "Large house bedroom one" } },
      { src: "/images/saxli/09-bedroom-2.jpg", alt: { ka: "დიდი სახლის მეორე საძინებელი", en: "Large house bedroom two" } },
      { src: "/images/saxli/10-bathroom.jpg", alt: { ka: "დიდი სახლის სააბაზანო", en: "Large house bathroom" } },
      { src: "/images/saxli/11-gazebo.jpg", alt: { ka: "დიდი სახლის ფანჩატური", en: "Large house gazebo" } },
    ],
  },
  owner: {
    image: {
      src: "/images/owner-gia.jpg",
      alt: { ka: "გია აბაშმაძის პორტრეტი", en: "Portrait of Gia Abashmadze" },
      position: "top",
    },
  },
  contacts: {
    facebook: "https://www.facebook.com/share/1DW2va7dDC/",
    instagram: "https://www.instagram.com/shemokmedi.chalet",
    whatsappNumber: "+995 551 44 87 86",
    phone: "+995 551 44 87 86",
  },
  location: {
    mapUrl: "https://www.google.com/maps/search/?api=1&query=41.8931913,42.0661844",
    coordinates: { latitude: 41.8931913, longitude: 42.0661844 },
  },
};
