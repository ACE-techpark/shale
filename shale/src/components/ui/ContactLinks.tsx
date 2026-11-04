"use client";

import { site } from "@/data/site";
import { contactHref } from "@/lib/contacts";
import type { ContactKind } from "@/types/site";
import { Icon } from "./Icon";
import { useLanguage } from "@/components/providers/SiteProvider";
export function ContactLinks({ compact = false }: { compact?: boolean }) {
  const { messages } = useLanguage();
  const channels: { kind: ContactKind; label: string }[] = [
    { kind: "facebook", label: "Facebook" },
    { kind: "instagram", label: "Instagram" },
    { kind: "whatsapp", label: "WhatsApp" },
    { kind: "phone", label: messages.contact.phone },
  ];
  return (
    <ul
      className={compact ? "social-links" : "contact-links"}
      aria-label={messages.contact.channels}
    >
      {channels.map(({ kind, label }) => {
        const href = contactHref(kind, site.contacts);
        const body = (
          <>
            <Icon name={kind} />
            {!compact && (
              <span className="contact-link-text">
                <span>{label}</span>
                <small>
                  {href
                    ? kind === "phone"
                      ? site.contacts.phone
                      : messages.contact.reachOut
                    : messages.contact.unavailable}
                </small>
              </span>
            )}
            {!compact && href && (
              <Icon name="arrowUp" className="ml-auto shrink-0" />
            )}
          </>
        );
        return (
          <li key={kind}>
            {href ? (
              <a
                className="contact-channel"
                href={href}
                aria-label={compact ? label : undefined}
                target={kind === "phone" ? undefined : "_blank"}
                rel={kind === "phone" ? undefined : "noopener noreferrer"}
              >
                {body}
              </a>
            ) : (
              <span
                className="contact-channel is-unavailable"
                aria-disabled="true"
                title={`${label} — ${messages.contact.pending}`}
              >
                {body}
                {compact && (
                  <span className="sr-only">{`${label} — ${messages.contact.pending}`}</span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
