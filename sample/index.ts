import Affiliate from "../src";

const affiliate = new Affiliate({ tag: "sample-20", marketplaceId: "526970" });

(async () => {
  const deals = await affiliate.getDeals({
    code: "5bbe9a70",
    page: 1,
  });

  console.log({ deals });

  const products = await affiliate.getProducts({
    code: "7842710011",
    page: 1,
  });

  console.log({ products });

  if (!products?.length) return;

  const longUrl = await affiliate.getLink({
    productId: products[0].id,
    short: false,
  });

  console.log({ longUrl });

  const shortUrl = await affiliate.getLink({
    productId: products[0].id,
    short: true,
  });

  console.log({ shortUrl });
})();
