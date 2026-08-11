const ID_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
  /(?:youtu\.be\/)([\w-]{11})/,
  /(?:youtube\.com\/embed\/)([\w-]{11})/,
  /(?:youtube\.com\/shorts\/)([\w-]{11})/,
];

export function youtubeId(url: string): string | null {
  for (const re of ID_PATTERNS) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return null;
}

export function youtubeEmbed(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function youtubeThumbnail(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function collectYoutubeUrls(
  urls?: string[],
  legacy?: string
): string[] {
  const all = [...(urls ?? []), legacy].filter((u): u is string => Boolean(u));
  return Array.from(new Set(all));
}

export function getYoutubeEmbeds(urls?: string[]): string[] {
  if (!urls?.length) return [];
  return Array.from(
    new Set(urls.map(youtubeEmbed).filter((u): u is string => Boolean(u)))
  );
}
