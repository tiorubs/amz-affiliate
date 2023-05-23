import { scrapeList } from "./utils";

export function dealPage(html: string) {
  return scrapeList(html, {
    listItem: "#octopus-dlp-asin-stream .a-list-item",
    link: ".octopus-dlp-asin-title > a",
    image: "a > img",
    currentValue: '.a-price:not([data-a-strike="true"]) > [aria-hidden="true"]',
    originalValue: ".octopus-widget-price-saving-info .a-text-strike",
  });
}
