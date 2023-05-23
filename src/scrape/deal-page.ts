import { scrapeList } from "./utils";

export function dealPage(html: string) {
  return scrapeList(html, {
    list: "#octopus-dlp-asin-stream .a-list-item",
    link: ".octopus-dlp-asin-title > a",
    image: "a > img",
    price: '.a-price:not([data-a-strike="true"]) > [aria-hidden="true"]',
    originalPrice: ".octopus-widget-price-saving-info .a-text-strike",
  });
}
