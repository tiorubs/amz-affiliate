import axios from "axios";
import { load } from "cheerio";

interface Product {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  price: number;
}

export default class Affiliate {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private getProductId(url?: string) {
    if (!url) return null;
    const urlPieces = url.split("/");
    const productIdIndex = urlPieces.indexOf("dp") + 1;
    return urlPieces[productIdIndex];
  }

  private scrapePageProducts(html: string) {
    const $ = load(html);

    const products: Product[] = [];

    $('[data-component-type="s-search-result"]').each((_index, productItem) => {
      const element = $(productItem);

      const link = element.find("h2 > a");
      const image = element.find('[data-component-type="s-product-image"] img');
      const value = element.find(
        '.s-price-instructions-style .a-price:not([data-a-strike="true"]) > [aria-hidden="true"]'
      );

      const id = this.getProductId(link.attr("href"));
      const title = link.text()?.trim();
      const thumbnail = image.attr("src");
      const price = Number(value.text()?.replace(/[^\d]+/g, ""));

      if (!id || !title || !thumbnail || !price) return;

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

  async getProducts(code: string, page?: number) {
    return axios(
      `https://www.amazon.com.br/s?rh=n%3A${code}%2Cp_n_condition-type%3A13862762011&page=${page}`,
      {
        headers: {
          authority: "www.amazon.com.br",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
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
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        },
      }
    ).then(({ data }) => this.scrapePageProducts(data));
  }

  getLink(productId: string) {
    return `https://www.amazon.com.br/dp/${productId}?tag=${this.tag}&urlCode=osi&th=1&psc=1`;
  }
}
