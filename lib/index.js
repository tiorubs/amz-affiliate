"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
class Affiliate {
    constructor(tag) {
        this.tag = tag;
    }
    getProductId(url) {
        if (!url)
            return null;
        const urlPieces = url.split("/");
        const productIdIndex = urlPieces.indexOf("dp") + 1;
        return urlPieces[productIdIndex];
    }
    scrapePageProducts(html) {
        const $ = (0, cheerio_1.load)(html);
        const products = [];
        $('[data-component-type="s-search-result"]').each((_index, productItem) => {
            var _a, _b;
            const element = $(productItem);
            const link = element.find("h2 > a");
            const image = element.find('[data-component-type="s-product-image"] img');
            const value = element.find('.s-price-instructions-style .a-price:not([data-a-strike="true"]) > [aria-hidden="true"]');
            const id = this.getProductId(link.attr("href"));
            const title = (_a = link.text()) === null || _a === void 0 ? void 0 : _a.trim();
            const thumbnail = image.attr("src");
            const price = Number((_b = value.text()) === null || _b === void 0 ? void 0 : _b.replace(/[^\d]+/g, ""));
            if (!id || !title || !thumbnail || !price)
                return;
            products.push({
                id,
                url: this.getLink(id),
                title,
                thumbnail: thumbnail.replace("_AC_UY218_", "_SX339_BO1,204,203,200"),
                thumbnail_alt: thumbnail,
                price,
            });
        });
        return products;
    }
    getProducts(code, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, axios_1.default)(`https://www.amazon.com.br/s?rh=n%3A${code}%2Cp_n_condition-type%3A13862762011&page=${page}`, {
                headers: {
                    authority: "www.amazon.com.br",
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "accept-language": "pt-BR,pt;q=0.7",
                    "sec-ch-ua": '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "sec-gpc": "1",
                    "upgrade-insecure-requests": "1",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
                },
            }).then(({ data }) => this.scrapePageProducts(data));
        });
    }
    getLink(productId) {
        return `https://www.amazon.com.br/dp/${productId}?tag=${this.tag}&urlCode=osi&th=1&psc=1`;
    }
}
exports.default = Affiliate;
