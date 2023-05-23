interface AffiliateProps {
    tag: string;
    marketplaceId?: string | number;
}
interface GetProductsProps {
    code: string;
    page: number;
}
interface GetLinkProps {
    productId: string;
    short?: boolean;
}
export default class Affiliate {
    private tag;
    private marketplaceId?;
    constructor(props: AffiliateProps);
    getProducts: ({ code, page }: GetProductsProps) => Promise<import("./scrape/utils").Product[]>;
    getDeals: ({ code, page }: GetProductsProps) => Promise<import("./scrape/utils").Product[]>;
    getLink: ({ productId, short }: GetLinkProps) => Promise<any>;
}
export {};
