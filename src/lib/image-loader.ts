// Global next/image loader that routes remote images through the
// wsrv.nl CDN (https://wsrv.nl) for on-the-fly resizing, compression
// and modern-format (WebP) delivery.
//
// Local assets (anything served from /public, i.e. paths starting with
// "/") are returned untouched because wsrv.nl cannot reach them.

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function wsrvLoader({ src, width, quality }: LoaderArgs): string {
  // Local/public asset — serve directly, no CDN proxy.
  if (src.startsWith("/")) return src;

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 72),
    output: "webp",
    // never upscale beyond the source resolution
    we: "",
  });

  return `https://wsrv.nl/?${params.toString()}`;
}
