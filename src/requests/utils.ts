// @ts-nocheck
import axios, { RawAxiosRequestHeaders } from "axios";

const defaultHeaders: RawAxiosRequestHeaders = {
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
};

const api = axios.create({
  baseURL: "https://www.amazon.com.br",
});

export async function get(endPoint: string, headers = defaultHeaders) {
  return api(endPoint, {
    headers: headers,
  }).then(({ data }) => data);
}
