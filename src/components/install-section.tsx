"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DownloadIcon, ExternalIcon } from "@/components/icons";
import {
  CURSOR_DOWNLOAD_URL,
  CURSOR_INSTALL_DOCS_URL,
  type DownloadPlatform,
  platformDownloads,
} from "@/components/workshop-data";
import type { Dictionary } from "@/i18n/types";

function detectPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") return "darwin-universal";

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() ?? "";
  const uaData = (
    navigator as Navigator & {
      userAgentData?: { architecture?: string };
    }
  ).userAgentData;
  const arch = uaData?.architecture?.toLowerCase() ?? "";

  const isArm =
    arch.includes("arm") ||
    ua.includes("arm64") ||
    ua.includes("aarch64") ||
    platform.includes("arm");

  if (ua.includes("win")) {
    return isArm ? "win32-arm64" : "win32-x64";
  }

  if (ua.includes("linux") && !ua.includes("android")) {
    return isArm ? "linux-arm64" : "linux-x64";
  }

  return "darwin-universal";
}

type InstallSectionProps = {
  reduceMotion: boolean;
  copy: Dictionary["install"];
};

export function InstallSection({ reduceMotion, copy }: InstallSectionProps) {
  const [platform, setPlatform] = useState<DownloadPlatform>("darwin-universal");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    setReady(true);
  }, []);

  const download =
    platformDownloads[platform] ?? platformDownloads["darwin-universal"];
  const shortLabel = copy.platforms[download.platformKey];
  const downloadLabel = copy.downloadFor.replace("{platform}", shortLabel);

  return (
    <section id="install" className="scroll-mt-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {copy.description}
          </p>
        </div>

        <motion.div
          className="mt-14 overflow-hidden rounded-[1.75rem] border border-border bg-surface"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
              <div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                    <Image
                      src="/cursor-mark.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 invert dark:invert-0"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-foreground">
                      {copy.productName}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {copy.productTagline}
                    </p>
                  </div>
                </div>

                <p className="mt-7 max-w-md text-base leading-relaxed text-foreground/90">
                  {copy.body}
                </p>

                <ol className="mt-8 space-y-3 text-sm text-muted">
                  {copy.steps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-mono text-accent">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-4">
                <a
                  href={download.href}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] sm:w-auto"
                >
                  <DownloadIcon className="transition-transform group-hover:translate-y-0.5" />
                  <span className={ready ? undefined : "opacity-80"}>
                    {downloadLabel}
                  </span>
                </a>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <a
                    href={CURSOR_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {copy.allPlatforms}
                    <ExternalIcon className="ml-1.5" />
                  </a>
                  <span className="hidden text-border sm:inline" aria-hidden>
                    ·
                  </span>
                  <a
                    href={CURSOR_INSTALL_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {copy.installGuide}
                    <ExternalIcon className="ml-1.5" />
                  </a>
                </div>

                <div
                  className="flex flex-wrap gap-2 pt-1"
                  role="group"
                  aria-label={copy.choosePlatform}
                >
                  {(
                    [
                      ["darwin-universal", "mac"],
                      ["win32-x64", "win"],
                      ["linux-x64", "linux"],
                    ] as const
                  ).map(([key, family]) => {
                    const item = platformDownloads[key];
                    const active =
                      (family === "mac" && platform.startsWith("darwin")) ||
                      (family === "win" && platform.startsWith("win32")) ||
                      (family === "linux" && platform.startsWith("linux"));
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPlatform(key)}
                        aria-pressed={active}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          active
                            ? "border-foreground/25 bg-surface-soft text-foreground"
                            : "border-border text-muted hover:border-foreground/20 hover:text-foreground"
                        }`}
                      >
                        {copy.platforms[item.platformKey]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden border-t border-border bg-[#09090b] lg:min-h-full lg:border-l lg:border-t-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 70% at 70% 10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(50% 45% at 15% 85%, rgba(45,212,191,0.07), transparent 55%)",
                }}
              />
              <div className="relative flex h-full items-center justify-center p-4 sm:p-5 lg:p-6">
                <div className="relative mx-auto w-full max-w-[34rem] aspect-[5/4]">
                  <motion.div
                    className="absolute left-0 top-[8%] z-10 w-[78%] overflow-hidden rounded-[1rem] border border-white/12 shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5"
                    initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: -1.5 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, y: 0, rotate: -1.5 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image
                      src="/cursor-agents-diff.jpg"
                      alt={copy.imageAltDiff}
                      width={1400}
                      height={920}
                      className="h-auto w-full object-cover object-left-top"
                      sizes="(max-width: 1024px) 70vw, 420px"
                      quality={90}
                      priority={false}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-[4%] right-0 z-20 w-[84%] overflow-hidden rounded-[1.1rem] border border-white/14 shadow-[0_32px_90px_rgba(0,0,0,0.62)] ring-1 ring-white/8"
                    initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: 1.25 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 1.25 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image
                      src="/cursor-agents-window.jpg"
                      alt={copy.imageAltAgents}
                      width={1680}
                      height={1020}
                      className="h-auto w-full object-cover object-left-top"
                      sizes="(max-width: 1024px) 80vw, 480px"
                      quality={90}
                      priority={false}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
