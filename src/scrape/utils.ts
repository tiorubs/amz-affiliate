import { load } from "cheerio";

export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  price: number;
  original_price?: number;
  discount?: number;
}

export function getProductId(url?: string) {
  if (!url) return null;
  url = url.split("?")[0];
  const urlPieces = url.split("/");
  const productIdIndex = urlPieces.indexOf("dp") + 1;
  return urlPieces[productIdIndex];
}

interface ScrapeListSelectors {
  listItem: string;
  link: string;
  image: string;
  currentValue: string;
  originalValue: string;
}

function biggerImage(url: string) {
  const a = url.split("/");
  const imageResolutionPieces = a[a.length - 1].split(".");
  imageResolutionPieces[1] = "_SX800,800";
  a[a.length - 1] = imageResolutionPieces.join(".");
  return a.join("/");
}

export function scrapeList(html: string, selectors: ScrapeListSelectors) {
  const $ = load(html);

  const products: Product[] = [];

  $(selectors.listItem).each((_index, productItem) => {
    const element = $(productItem);

    const link = element.find(selectors.link);
    const image = element.find(selectors.image);
    const currentValue = element.find(selectors.currentValue).first();
    const originalValue = element.find(selectors.originalValue).first();

    const id = getProductId(link.attr("href"));
    const title = link.text()?.trim();
    const thumbnail = image.attr("src");
    const price = Number(currentValue.text()?.replace(/[^\d]+/g, ""));
    const original_price = Number(originalValue.text()?.replace(/[^\d]+/g, "")) || undefined;
    const discount = original_price ? Math.round(100 * (1 - price / original_price)) : undefined;

    if (!id || !title || !thumbnail || !price) return;

    products.push({
      id,
      title,
      thumbnail: biggerImage(thumbnail),
      thumbnail_alt: thumbnail,
      price,
      original_price,
      discount,
    });
  });

  return products;
}
