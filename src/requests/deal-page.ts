import { get } from "./utils";

export async function dealPage(code: string, page: number) {
  if (!code) throw "missing code";
  if (!page) throw "missing page";

  return get(`/deal/${code}?pageNum=${page}`);
}
