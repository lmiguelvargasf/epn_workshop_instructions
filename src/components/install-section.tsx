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

export function InstallSection({ reduceMotion }: { reduceMotion: boolean }) {
  const [platform, setPlatform] = useState<DownloadPlatform>("darwin-universal");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    setReady(true);
  }, []);

  const download =
    platformDownloads[platform] ?? platformDownloads["darwin-universal"];

  return (
    <section id="install" className="scroll-mt-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Step two
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
            Install Cursor
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            After creating your accounts, download the desktop app. This is the
            editor we will use for the whole workshop.
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
                      Cursor IDE
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      The AI code editor
                    </p>
                  </div>
                </div>

                <p className="mt-7 max-w-md text-base leading-relaxed text-foreground/90">
                  Download and install Cursor for your operating system, then
                  sign in with the account you just created.
                </p>

                <ol className="mt-8 space-y-3 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="font-mono text-accent">1</span>
                    <span>Download the installer for your machine.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-accent">2</span>
                    <span>Open Cursor and sign in.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-accent">3</span>
                    <span>Keep it ready for the workshop session.</span>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <a
                  href={download.href}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] sm:w-auto"
                >
                  <DownloadIcon className="transition-transform group-hover:translate-y-0.5" />
                  <span className={ready ? undefined : "opacity-80"}>
                    {download.label}
                  </span>
                </a>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <a
                    href={CURSOR_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    All platforms
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
                    Install guide
                    <ExternalIcon className="ml-1.5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Choose platform">
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
                        {item.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative min-h-[18rem] border-t border-border bg-[#0b0b0b] lg:min-h-full lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="relative flex h-full items-end p-4 sm:p-6 lg:p-8">
                <motion.div
                  className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src="/cursor-preview.jpg"
                    alt="Cursor product preview"
                    width={1500}
                    height={500}
                    className="h-auto w-full object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
