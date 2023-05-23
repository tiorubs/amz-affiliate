import { get } from "./utils";

export async function productPage(code: string, page: number) {
  if (!code) throw "missing code";
  if (!page) throw "missing page";

  return get(`/s?rh=n%3A${code}%2Cp_n_condition-type%3A13862762011&page=${page}`);
}
