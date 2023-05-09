interface Product {
    id: string;
    url: string;
    title: string;
    thumbnail: string;
    thumbnail_alt: string;
    price: number;
}
export default class Affiliate {
    private tag;
    constructor(tag: string);
    private getProductId;
    private scrapePageProducts;
    getProducts(code: string, page?: number): Promise<Product[]>;
    getLink(productId: string): string;
}
export {};
