"use client";

import React from "react";
import Image from "next/image";
import { SiteContent } from "@/content/en";

interface WorkSectionProps {
  content: SiteContent;
}

export default function WorkSection({ content }: WorkSectionProps) {
  const clientProjects = content.work.projects.filter((p) => p.type === "client");
  const studioProjects = content.work.projects.filter((p) => p.type === "studio");

  return (
    <section id="work" className="py-24 md:py-32 hairline-b">
      <div className="grid-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 hairline-b">
          <div>
            <div className="flex items-center gap-2 num-label mb-3">
              <span>{content.work.sectionNumber}</span>
              <span className="text-[var(--line)]">/</span>
              <span className="uppercase text-[var(--accent)]">INDEX</span>
            </div>
            <h2 className="display-title text-[var(--text)]">
              {content.work.sectionTitle}
            </h2>
          </div>
        </div>

        {/* Group 1: Client Work (Laptop + Phone Mockups) */}
        <div className="pt-16 pb-12">
          <div className="num-label uppercase tracking-widest text-[var(--muted)] mb-12 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--line)]" />
            <span>{content.work.groupClientTitle}</span>
          </div>

          <div className="space-y-28 md:space-y-36">
            {clientProjects.map((project, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                  {/* Text Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs num-label">
                      <span className="text-[var(--accent)] font-medium">
                        {project.studioTag}
                      </span>
                      <span>{project.tag}</span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block mb-1">
                        {project.category} · {project.location}
                      </span>
                      <h3 className="display-section text-[var(--text)]">
                        {project.title}
                      </h3>
                    </div>

                    <p className="body-regular text-[var(--muted)] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Live site link */}
                    <div className="pt-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs inline-flex items-center gap-2 group"
                      >
                        <span>{content.work.openLive}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path
                            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Device Composition (7 cols): Laptop + Overlapping Mobile Phone */}
                  <div
                    className={`lg:col-span-7 relative ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative mx-auto max-w-[620px]">
                      {/* Laptop Mockup Shell */}
                      <div className="relative rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden device-shadow">
                        {/* Browser Top Bar */}
                        <div className="h-7 px-3 bg-[var(--surface-2)] border-b border-[var(--line)] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                          </div>
                          <span className="text-[10px] font-mono text-[var(--muted)] truncate max-w-[200px]">
                            {project.url.replace("https://", "").replace("www.", "")}
                          </span>
                          <span className="w-8" />
                        </div>

                        {/* Laptop Screen Content */}
                        <div className="relative aspect-[16/10] w-full bg-[#050505]">
                          <Image
                            src={project.laptopImage}
                            alt={`${project.title} Desktop Screenshot`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 620px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>

                      {/* Phone Mockup Shell (Asymmetric Overlap) */}
                      {project.phoneImage && (
                        <div
                          className={`absolute -bottom-6 w-[140px] sm:w-[170px] aspect-[9/19] rounded-[8px] border border-[var(--line)] bg-[var(--surface)] overflow-hidden device-shadow z-20 ${
                            isEven ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
                          }`}
                        >
                          {/* Phone Speaker & Camera Notch */}
                          <div className="h-4 bg-[var(--surface-2)] border-b border-[var(--line)] flex items-center justify-center">
                            <span className="w-8 h-1 rounded-full bg-[rgba(234,230,218,0.2)]" />
                          </div>
                          <div className="relative w-full h-[calc(100%-16px)] bg-[#050505]">
                            <Image
                              src={project.phoneImage}
                              alt={`${project.title} Mobile Screenshot`}
                              fill
                              sizes="170px"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Group 2: Studio Builds and Earlier Portfolios (Laptop Only) */}
        <div className="pt-20">
          <div className="num-label uppercase tracking-widest text-[var(--muted)] mb-12 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--line)]" />
            <span>{content.work.groupStudioTitle}</span>
          </div>

          <div className="space-y-28 md:space-y-36">
            {studioProjects.map((project, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                  {/* Text Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs num-label">
                      <span className="text-[var(--accent)] font-medium">
                        {project.studioTag}
                      </span>
                      <span>{project.tag}</span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block mb-1">
                        {project.category} · {project.location}
                      </span>
                      <h3 className="display-section text-[var(--text)]">
                        {project.title}
                      </h3>
                    </div>

                    <p className="body-regular text-[var(--muted)] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Live site link */}
                    <div className="pt-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs inline-flex items-center gap-2 group"
                      >
                        <span>{content.work.openLive}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path
                            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Device Composition (7 cols): Laptop Mockup */}
                  <div
                    className={`lg:col-span-7 relative ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative mx-auto max-w-[620px]">
                      {/* Laptop Mockup Shell */}
                      <div className="relative rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden device-shadow">
                        <div className="h-7 px-3 bg-[var(--surface-2)] border-b border-[var(--line)] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgba(234,230,218,0.15)]" />
                          </div>
                          <span className="text-[10px] font-mono text-[var(--muted)] truncate max-w-[200px]">
                            {project.url.replace("https://", "").replace("www.", "")}
                          </span>
                          <span className="w-8" />
                        </div>

                        <div className="relative aspect-[16/10] w-full bg-[#050505]">
                          <Image
                            src={project.laptopImage}
                            alt={`${project.title} Desktop Screenshot`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 620px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
