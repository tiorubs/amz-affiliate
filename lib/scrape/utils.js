"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeList = exports.getProductId = void 0;
const cheerio_1 = require("cheerio");
function getProductId(url) {
    if (!url)
        return null;
    url = url.split("?")[0];
    const urlPieces = url.split("/");
    const productIdIndex = urlPieces.indexOf("dp") + 1;
    return urlPieces[productIdIndex];
}
exports.getProductId = getProductId;
function biggerImage(url) {
    const a = url.split("/");
    const imageResolutionPieces = a[a.length - 1].split(".");
    imageResolutionPieces[1] = "_SX800,800";
    a[a.length - 1] = imageResolutionPieces.join(".");
    return a.join("/");
}
function scrapeList(html, selectors) {
    const $ = (0, cheerio_1.load)(html);
    const products = [];
    $(selectors.list).each((_index, productItem) => {
        var _a, _b, _c;
        const element = $(productItem);
        const linkElement = element.find(selectors.link);
        const imageElement = element.find(selectors.image);
        const priceElement = element.find(selectors.price).first();
        const originalPriceElement = element.find(selectors.originalPrice).first();
        const id = getProductId(linkElement.attr("href"));
        const title = (_a = linkElement.text()) === null || _a === void 0 ? void 0 : _a.trim();
        const image = imageElement.attr("src");
        const price = Number((_b = priceElement.text()) === null || _b === void 0 ? void 0 : _b.replace(/[^\d]+/g, ""));
        const original_price = Number((_c = originalPriceElement.text()) === null || _c === void 0 ? void 0 : _c.replace(/[^\d]+/g, "")) || undefined;
        const discount = original_price ? Math.round(100 * (1 - price / original_price)) : undefined;
        if (!id || !title || !image || !price)
            return;
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
exports.scrapeList = scrapeList;
