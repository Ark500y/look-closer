"use client";

import React, { useState } from "react";
import { SiteContent } from "@/content/en";
import { siteConfig } from "@/config/site";

interface ContactSectionProps {
  content: SiteContent;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [country, setCountry] = useState("");
  const [selectedNeed, setSelectedNeed] = useState(content.contact.form.needs[0]);
  const [message, setMessage] = useState("");

  // Build WhatsApp URL with pre-filled message
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const parts = [
      `Hello Abdulrehman,`,
      name ? `My name is ${name}${business ? ` from ${business}` : ""}.` : "",
      country ? `Location: ${country}.` : "",
      `Project need: ${selectedNeed}.`,
      message ? `Details: ${message}` : "",
    ].filter(Boolean);

    const fullMessage = parts.join("\n\n");
    const waUrl = `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(fullMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Build Mailto URL
  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = `Project Inquiry: ${name || "New Client"} — ${business || selectedNeed}`;
    const body = `Name: ${name || "N/A"}\nBusiness: ${business || "N/A"}\nLocation: ${country || "N/A"}\nNeed: ${selectedNeed}\n\nProject Details:\n${message || "N/A"}`;
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 md:py-32 hairline-b">
      <div className="grid-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 hairline-b">
          <div>
            <div className="flex items-center gap-2 num-label mb-3">
              <span>{content.contact.sectionNumber}</span>
              <span className="text-[var(--line)]">/</span>
              <span className="uppercase text-[var(--accent)]">DIRECT INQUIRY</span>
            </div>
            <h2 className="display-title text-[var(--text)]">
              {content.contact.headline}
            </h2>
          </div>
          <p className="body-regular max-w-md text-[var(--muted)]">
            {content.contact.subline}
          </p>
        </div>

        {/* 12-Column Layout: Form (7 cols) + Direct Channel Details (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16">
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                  {content.contact.form.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={content.contact.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-[var(--ui-radius)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                  {content.contact.form.businessLabel}
                </label>
                <input
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder={content.contact.form.businessPlaceholder}
                  className="w-full px-4 py-3 rounded-[var(--ui-radius)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
            </div>

            {/* Country / City */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                {content.contact.form.countryLabel}
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={content.contact.form.countryPlaceholder}
                className="w-full px-4 py-3 rounded-[var(--ui-radius)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Need Selection (Restrained 4px buttons, no pills) */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                {content.contact.form.needLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {content.contact.form.needs.map((item) => {
                  const isSelected = selectedNeed === item;
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setSelectedNeed(item)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-[var(--ui-radius)] border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
                          : "bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Details Message */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                {content.contact.form.messageLabel}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={content.contact.form.messagePlaceholder}
                className="w-full px-4 py-3 rounded-[var(--ui-radius)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
              />
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn-primary flex items-center gap-2.5 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.905.533 3.684 1.455 5.203L2 22l4.912-1.424a10.02 10.02 0 0 0 5.119 1.455h.005c5.534 0 10.029-4.495 10.029-10.031A10.035 10.035 0 0 0 12.031 2Zm0 18.369h-.004a8.347 8.347 0 0 1-4.254-1.163l-.305-.181-3.158.916.924-3.078-.198-.316a8.318 8.318 0 0 1-1.34-4.516c0-4.606 3.748-8.354 8.356-8.354a8.318 8.318 0 0 1 5.908 2.451 8.32 8.32 0 0 1 2.449 5.908c0 4.608-3.748 8.357-8.358 8.357Zm4.582-6.262c-.251-.126-1.488-.735-1.719-.818-.23-.084-.398-.126-.566.126-.168.251-.649.818-.796.985-.147.168-.293.189-.544.063-.251-.126-1.06-.391-2.02-1.246-.747-.666-1.251-1.489-1.398-1.74-.147-.251-.016-.387.11-.512.113-.113.251-.293.377-.44.126-.147.168-.251.251-.419.084-.168.042-.314-.021-.44-.063-.126-.566-1.362-.776-1.866-.204-.49-.412-.424-.566-.432l-.482-.008c-.168 0-.44.063-.67.314-.23.251-.88 0.86-.88 2.097s.901 2.432 1.026 2.6c.126.168 1.774 2.709 4.3 3.799.601.259 1.07.414 1.436.531.604.192 1.153.165 1.587.1.483-.072 1.488-.608 1.697-1.194.209-.587.209-1.09.147-1.194-.063-.105-.23-.168-.481-.293Z" />
                </svg>
                <span>{content.contact.form.sendWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="btn-secondary flex items-center gap-2 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{content.contact.form.sendEmail}</span>
              </button>
            </div>
          </div>

          {/* Direct Channels & Working Hours Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)] space-y-6">
              <h3 className="font-serif text-2xl text-[var(--text)]">
                {content.contact.directHeading}
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-mono block mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-mono block mb-1">
                    WhatsApp Direct
                  </span>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {siteConfig.whatsapp}
                  </a>
                </div>

                <div className="pt-2 hairline-t">
                  <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-mono block mb-1">
                    Studio Working Hours
                  </span>
                  <p className="text-sm text-[var(--text)]">
                    {content.contact.directHours}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {content.contact.availableNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
