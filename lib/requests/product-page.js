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
exports.productPage = void 0;
const utils_1 = require("./utils");
function productPage(code, page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!code)
            throw "missing code";
        if (!page)
            throw "missing page";
        return (0, utils_1.get)(`/s?rh=n%3A${code}%2Cp_n_condition-type%3A13862762011&page=${page}`);
    });
}
exports.productPage = productPage;
