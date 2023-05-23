"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./utils/hash");
const scrape = __importStar(require("./scrape"));
const requests = __importStar(require("./requests"));
class Affiliate {
    constructor(props) {
        this.getProducts = ({ code, page }) => __awaiter(this, void 0, void 0, function* () {
            if (!code)
                throw "missing code";
            if (!page)
                throw "missing page";
            const products = yield requests.productPage(code, page).then(scrape.productPage);
            return products;
        });
        this.getDeals = ({ code, page }) => __awaiter(this, void 0, void 0, function* () {
            if (!code)
                throw "missing code";
            if (!page)
                throw "missing page";
            const products = yield requests.dealPage(code, page).then(scrape.dealPage);
            return products;
        });
        this.getLink = ({ productId, short }) => __awaiter(this, void 0, void 0, function* () {
            let link = `https://www.amazon.com.br/dp/${productId}?tag=${this.tag}`;
            if (!short)
                return link;
            link += `&linkId=${hash_1.hash.random(32)}`;
            return requests.shrinkLink(link, this.marketplaceId);
        });
        this.tag = props.tag;
        this.marketplaceId = props.marketplaceId;
    }
}
exports.default = Affiliate;
