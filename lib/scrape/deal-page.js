"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealPage = void 0;
const utils_1 = require("./utils");
function dealPage(html) {
    return (0, utils_1.scrapeList)(html, {
        listItem: "#octopus-dlp-asin-stream .a-list-item",
        link: ".octopus-dlp-asin-title > a",
        image: "a > img",
        currentValue: '.a-price:not([data-a-strike="true"]) > [aria-hidden="true"]',
        originalValue: ".octopus-widget-price-saving-info .a-text-strike",
    });
}
exports.dealPage = dealPage;
