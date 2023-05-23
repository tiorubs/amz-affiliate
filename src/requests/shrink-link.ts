import { get } from "./utils";
import { hash } from "../utils/hash";

export async function shrinkLink(longUrl: string, marketplaceId?: string | number) {
  if (!marketplaceId) throw "missing marketplaceId";

  return get(
    `/associates/sitestripe/getShortUrl?longUrl=${encodeURIComponent(
      longUrl
    )}&marketplaceId=${marketplaceId}`,
    {
      cookie: `x-acbbr="${hash.xACBBR()}";`,
    }
  ).then((json) => json.shortUrl);
}
