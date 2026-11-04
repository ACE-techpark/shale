import Image from "next/image";
import type { CSSProperties } from "react";
import type { LocalImage } from "@/types/site";
import { Icon } from "./Icon";
import { Contours } from "./Contours";
type Props = {
  image: LocalImage | null;
  label: string;
  imageAlt?: string;
  className?: string;
  number?: string;
  portrait?: boolean;
  sizes?: string;
};
export function Media({
  image,
  label,
  imageAlt,
  className = "",
  number,
  portrait = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: Props) {
  return (
    <div className={`media-panel ${className} ${image ? "has-image" : ""}`}>
      {image ? (
        <Image
          src={image.src}
          alt={imageAlt ?? (typeof image.alt === "string" ? image.alt : image.alt.ka)}
          fill
          loading="lazy"
          sizes={sizes}
          className="property-image"
          style={
            {
              "--image-position": image.position ?? "center",
              "--image-mobile-position":
                image.mobilePosition ?? image.position ?? "center",
            } as CSSProperties
          }
        />
      ) : (
        <>
          <Contours />
          {number && (
            <span className="media-number" aria-hidden="true">
              {number}
            </span>
          )}
          <div
            className={`media-symbol ${portrait ? "portrait-symbol" : ""}`}
            aria-hidden="true"
          >
            <Icon name={portrait ? "person" : "photo"} />
          </div>
          <div className="media-caption">
            <span>{label}</span>
          </div>
        </>
      )}
    </div>
  );
}
