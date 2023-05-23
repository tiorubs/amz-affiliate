import { load } from "cheerio";

export interface Product {
  id: string;
  title: string;
  image: string;
  image_alt: string;
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
  list: string;
  link: string;
  image: string;
  price: string;
  originalPrice: string;
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

  $(selectors.list).each((_index, productItem) => {
    const element = $(productItem);

    const linkElement = element.find(selectors.link);
    const imageElement = element.find(selectors.image);
    const priceElement = element.find(selectors.price).first();
    const originalPriceElement = element.find(selectors.originalPrice).first();

    const id = getProductId(linkElement.attr("href"));
    const title = linkElement.text()?.trim();
    const image = imageElement.attr("src");
    const price = Number(priceElement.text()?.replace(/[^\d]+/g, ""));
    const original_price = Number(originalPriceElement.text()?.replace(/[^\d]+/g, "")) || undefined;
    const discount = original_price ? Math.round(100 * (1 - price / original_price)) : undefined;

    if (!id || !title || !image || !price) return;

    products.push({
      id,
      title,
      image: biggerImage(image),
      image_alt: image,
      price,
      original_price,
      discount,
    });
  });

  return products;
}
