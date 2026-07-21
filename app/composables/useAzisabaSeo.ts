import type { MaybeRefOrGetter } from "vue";

const siteName = "アジ鯖公式サイト";
const siteUrl = "https://www.azisaba.net";
const defaultDescription =
  "アジ鯖、たのしい。Minecraftマルチプレイサーバー アジ鯖の公式ホームページです。";
const defaultImage = "/images/toppage.webp";

const normalizeDescription = (description?: string) => {
  const normalized = description?.replace(/\s+/g, " ").trim();
  return normalized || defaultDescription;
};

const toAbsoluteUrl = (path = defaultImage) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
};

const toIsoString = (date?: string | Date) => (date ? new Date(date).toISOString() : undefined);

export function useAzisabaSeo() {
  const route = useRoute();

  const canonical = computed(() => new URL(route.path, siteUrl).toString());

  const title = (value: MaybeRefOrGetter<string | undefined>) =>
    computed(() => {
      const current = toValue(value) || siteName;
      return route.path === "/" || current === siteName ? current : `${current} | ${siteName}`;
    });

  const description = (value?: MaybeRefOrGetter<string | undefined>) =>
    computed(() => normalizeDescription(toValue(value)));

  const image = (value?: MaybeRefOrGetter<string | null | undefined>) =>
    computed(() => toAbsoluteUrl(toValue(value) || defaultImage));

  const date = (value?: MaybeRefOrGetter<string | Date | undefined>) =>
    computed(() => toIsoString(toValue(value)));

  return {
    siteName,
    canonical,
    title,
    description,
    image,
    date,
  };
}
