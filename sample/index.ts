import Affiliate from "../lib";

const affiliate = new Affiliate("my-tag-here");

(async () => {
  const products = [];

  for (let i = 0; i < 3; i++) {
    const items = await affiliate.getProducts("7842558011", 1);
    if (!!items.length) products.push(...items);
  }

  console.log(products, products.length);
})();
