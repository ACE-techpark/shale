"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/SiteProvider";

export function BrandMark({ className = "" }: { className?: string }) {
  const { messages } = useLanguage();
  return (
    <Image
      src="/logo.png"
      alt={messages.brand}
      width={150}
      height={150}
      className={`brand-logo ${className}`.trim()}
    />
  );
}
