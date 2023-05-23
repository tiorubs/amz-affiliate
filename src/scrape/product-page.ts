// import { load } from "cheerio";
// import { writeFileSync } from "fs";
// import { getProductId } from "./utils";

import { scrapeList } from "./utils";

export function productPage(html: string) {
  return scrapeList(html, {
    listItem: `[data-component-type="s-search-result"]`,
    link: `h2 > a`,
    image: `[data-component-type="s-product-image"] img`,
    currentValue: `.a-price:not([data-a-strike="true"]) > [aria-hidden="true"]`,
    originalValue: `.a-price[data-a-strike="true"] > [aria-hidden="true"]`,
  });

  // const $ = load(html);

  // const products: Product[] = [];

  // $('[data-component-type="s-search-result"]').each((_index, productItem) => {
  //   const element = $(productItem);

  //   const link = element.find("h2 > a");
  //   const image = element.find('[data-component-type="s-product-image"] img');
  //   const currentValue = element
  //     .find('.a-price:not([data-a-strike="true"]) > [aria-hidden="true"]')
  //     .first();
  //   const originalValue = element.find('.a-price[data-a-strike="true"] > [aria-hidden="true"]').first();

  //   const id = getProductId(link.attr("href"));
  //   const title = link.text()?.trim();
  //   const thumbnail = image.attr("src");
  //   const price = Number(currentValue.text()?.replace(/[^\d]+/g, ""));
  //   const original_price = Number(originalValue.text()?.replace(/[^\d]+/g, "")) || undefined;

  //   if (!id || !title || !thumbnail || !price) return;

  //   products.push({
  //     id,
  //     title,
  //     thumbnail: thumbnail.replace("_AC_UY218_", "_SX339_BO1,204,203,200"),
  //     thumbnail_alt: thumbnail,
  //     price,
  //     original_price,
  //   });
  // });

  // return products;
}
