export interface Product {
    id: string;
    title: string;
    image: string;
    image_alt: string;
    price: number;
    original_price?: number;
    discount?: number;
}
export declare function getProductId(url?: string): string | null;
interface ScrapeListSelectors {
    list: string;
    link: string;
    image: string;
    price: string;
    originalPrice: string;
}
export declare function scrapeList(html: string, selectors: ScrapeListSelectors): Product[];
export {};
