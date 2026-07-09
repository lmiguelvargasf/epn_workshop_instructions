"use client";

import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { RocketIcon } from "@/components/icons";
import { TEMPLATE_URL } from "@/components/workshop-data";

const CONFETTI_KEY = "epn-workshop-ready-confetti";

function fireConfetti() {
  const colors = ["#2dd4bf", "#0e7c86", "#5eead4", "#e8eef4", "#fbbf24"];
  const end = Date.now() + 1400;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      zIndex: 100,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      zIndex: 100,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.65 },
    colors,
    zIndex: 100,
  });
  requestAnimationFrame(frame);
}

function openTemplate() {
  window.open(TEMPLATE_URL, "_blank", "noopener,noreferrer");
}

export function ReadySection() {
  const reduceMotion = useReducedMotion();
  const [celebrating, setCelebrating] = useState(false);
  const navigating = useRef(false);

  const handleReady = useCallback(() => {
    if (navigating.current || celebrating) return;

    const alreadyPlayed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(CONFETTI_KEY) === "1";

    if (alreadyPlayed || reduceMotion) {
      openTemplate();
      return;
    }

    navigating.current = true;
    setCelebrating(true);
    window.localStorage.setItem(CONFETTI_KEY, "1");
    fireConfetti();

    window.setTimeout(() => {
      openTemplate();
      setCelebrating(false);
      navigating.current = false;
    }, 1600);
  }, [celebrating, reduceMotion]);

  return (
    <section id="ready" className="scroll-mt-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <motion.div
          className="mx-auto flex max-w-xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <RocketIcon />
          </span>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Next step
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-5xl">
            You&apos;re ready
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Once Cursor is installed and your accounts are set, open the
            workshop repository and wait until we begin building the app.
          </p>
          <button
            type="button"
            onClick={handleReady}
            disabled={celebrating}
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-fg transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] disabled:cursor-wait disabled:opacity-90"
          >
            {celebrating ? "Opening template…" : "I'm all set! ✨"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
