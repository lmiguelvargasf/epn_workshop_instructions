export const TEMPLATE_URL = "https://github.com/lmiguelvargasf/cursor_workshop";
export const CURSOR_DOWNLOAD_URL = "https://cursor.com/download";
export const CURSOR_INSTALL_DOCS_URL =
  "https://cursor.com/help/getting-started/install";

export type DownloadPlatform =
  | "darwin-universal"
  | "win32-x64"
  | "win32-arm64"
  | "linux-x64"
  | "linux-arm64";

export const accounts = [
  {
    step: "01",
    name: "Cursor",
    purpose: "Your AI-native code editor for the workshop.",
    href: "https://cursor.com",
    cta: "Create Cursor account",
  },
  {
    step: "02",
    name: "GitHub",
    purpose: "Host your project and fork the workshop template.",
    href: "https://github.com/signup",
    cta: "Create GitHub account",
  },
  {
    step: "03",
    name: "Vercel",
    purpose: "Deploy your app from GitHub in a few clicks.",
    href: "https://vercel.com/signup",
    cta: "Create Vercel account",
  },
] as const;

export const platformDownloads: Record<
  DownloadPlatform,
  { label: string; shortLabel: string; href: string }
> = {
  "darwin-universal": {
    label: "Download for macOS",
    shortLabel: "macOS",
    href: "https://api2.cursor.sh/updates/download/golden/darwin-universal/cursor/3.10",
  },
  "win32-x64": {
    label: "Download for Windows",
    shortLabel: "Windows",
    href: "https://api2.cursor.sh/updates/download/golden/win32-x64/cursor/3.10",
  },
  "win32-arm64": {
    label: "Download for Windows (ARM)",
    shortLabel: "Windows ARM",
    href: "https://api2.cursor.sh/updates/download/golden/win32-arm64/cursor/3.10",
  },
  "linux-x64": {
    label: "Download for Linux",
    shortLabel: "Linux",
    href: "https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/3.10",
  },
  "linux-arm64": {
    label: "Download for Linux (ARM)",
    shortLabel: "Linux ARM",
    href: "https://api2.cursor.sh/updates/download/golden/linux-arm64/cursor/3.10",
  },
};
