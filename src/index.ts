import { hash } from "./utils/hash";
import * as scrape from "./scrape";
import * as requests from "./requests";

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
  private tag: string;
  private marketplaceId?: string | number;

  constructor(props: AffiliateProps) {
    this.tag = props.tag;
    this.marketplaceId = props.marketplaceId;
  }

  getProducts = async ({ code, page }: GetProductsProps) => {
    if (!code) throw "missing code";
    if (!page) throw "missing page";

    const products = await requests.productPage(code, page).then(scrape.productPage);

    return products;
  };

  getDeals = async ({ code, page }: GetProductsProps) => {
    if (!code) throw "missing code";
    if (!page) throw "missing page";

    const products = await requests.dealPage(code, page).then(scrape.dealPage);

    return products;
  };

  getLink = async ({ productId, short }: GetLinkProps) => {
    let link = `https://www.amazon.com.br/dp/${productId}?tag=${this.tag}`;

    if (!short) return link;

    link += `&linkId=${hash.random(32)}`;

    return requests.shrinkLink(link, this.marketplaceId);
  };
}
