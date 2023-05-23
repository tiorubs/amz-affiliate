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
Object.defineProperty(exports, "__esModule", { value: true });
exports.shrinkLink = void 0;
const utils_1 = require("./utils");
const hash_1 = require("../utils/hash");
function shrinkLink(longUrl, marketplaceId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!marketplaceId)
            throw "missing marketplaceId";
        return (0, utils_1.get)(`/associates/sitestripe/getShortUrl?longUrl=${encodeURIComponent(longUrl)}&marketplaceId=${marketplaceId}`, {
            cookie: `x-acbbr="${hash_1.hash.xACBBR()}";`,
        }).then((json) => json.shortUrl);
    });
}
exports.shrinkLink = shrinkLink;
