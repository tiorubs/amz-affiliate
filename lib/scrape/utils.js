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
function scrapeList(html, selectors) {
    const $ = (0, cheerio_1.load)(html);
    const products = [];
    $(selectors.listItem).each((_index, productItem) => {
        var _a, _b, _c;
        const element = $(productItem);
        const link = element.find(selectors.link);
        const image = element.find(selectors.image);
        const currentValue = element.find(selectors.currentValue).first();
        const originalValue = element.find(selectors.originalValue).first();
        const id = getProductId(link.attr("href"));
        const title = (_a = link.text()) === null || _a === void 0 ? void 0 : _a.trim();
        const thumbnail = image.attr("src");
        const price = Number((_b = currentValue.text()) === null || _b === void 0 ? void 0 : _b.replace(/[^\d]+/g, ""));
        const original_price = Number((_c = originalValue.text()) === null || _c === void 0 ? void 0 : _c.replace(/[^\d]+/g, "")) || undefined;
        const discount = original_price ? Math.round(100 * (1 - price / original_price)) : undefined;
        if (!id || !title || !thumbnail || !price)
            return;
        products.push({
            id,
            title,
            thumbnail: thumbnail.replace("_AC_UY218_", "_SX339_BO1,204,203,200"),
            thumbnail_alt: thumbnail,
            price,
            original_price,
            discount,
        });
    });
    return products;
}
exports.scrapeList = scrapeList;
