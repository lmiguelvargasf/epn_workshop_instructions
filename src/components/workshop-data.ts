export const TEMPLATE_URL = "https://github.com/lmiguelvargasf/cursor_workshop";
export const PROMPTS_URL =
  "https://github.com/lmiguelvargasf/cursor_workshop/tree/prompts/prompts/academic";
export const CURSOR_DOWNLOAD_URL = "https://cursor.com/download";
export const CURSOR_INSTALL_DOCS_URL =
  "https://cursor.com/help/getting-started/install";

export type DownloadPlatform =
  | "darwin-universal"
  | "win32-x64"
  | "win32-arm64"
  | "linux-x64"
  | "linux-arm64";

export const accountLinks = [
  "https://cursor.com",
  "https://github.com/signup",
  "https://vercel.com/signup",
] as const;

export const platformDownloads: Record<
  DownloadPlatform,
  { platformKey: keyof PlatformLabels; href: string }
> = {
  "darwin-universal": {
    platformKey: "macOS",
    href: "https://api2.cursor.sh/updates/download/golden/darwin-universal/cursor/3.10",
  },
  "win32-x64": {
    platformKey: "Windows",
    href: "https://api2.cursor.sh/updates/download/golden/win32-x64/cursor/3.10",
  },
  "win32-arm64": {
    platformKey: "Windows ARM",
    href: "https://api2.cursor.sh/updates/download/golden/win32-arm64/cursor/3.10",
  },
  "linux-x64": {
    platformKey: "Linux",
    href: "https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/3.10",
  },
  "linux-arm64": {
    platformKey: "Linux ARM",
    href: "https://api2.cursor.sh/updates/download/golden/linux-arm64/cursor/3.10",
  },
};

export type PlatformLabels = {
  macOS: string;
  Windows: string;
  "Windows ARM": string;
  Linux: string;
  "Linux ARM": string;
};
