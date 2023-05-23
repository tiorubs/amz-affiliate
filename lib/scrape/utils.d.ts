export interface Product {
    id: string;
    title: string;
    thumbnail: string;
    thumbnail_alt: string;
    price: number;
    original_price?: number;
    discount?: number;
}
export declare function getProductId(url?: string): string | null;
interface ScrapeListSelectors {
    listItem: string;
    link: string;
    image: string;
    currentValue: string;
    originalValue: string;
}
export declare function scrapeList(html: string, selectors: ScrapeListSelectors): Product[];
export {};
