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
const src_1 = __importDefault(require("../src"));
const affiliate = new src_1.default({ tag: "sample-20", marketplaceId: "526970" });
(() => __awaiter(void 0, void 0, void 0, function* () {
    const deals = yield affiliate.getDeals({
        code: "5bbe9a70",
        page: 1,
    });
    console.log({ deals });
    // const products = await affiliate.getProducts({
    //   code: "7842710011",
    //   page: 1,
    // });
    // console.log({ products });
    // if (!products?.length) return;
    // const longUrl = await affiliate.getLink({
    //   productId: products[0].id,
    //   short: false,
    // });
    // console.log({ longUrl });
    // const shortUrl = await affiliate.getLink({
    //   productId: products[0].id,
    //   short: true,
    // });
    // console.log({ shortUrl });
}))();
