import cheerio from "cheerio";
import fetch from "cross-fetch";
import { logger } from "./logger";

export const getAllPhotos = async (urlProfile: string) => {
  const doc = await fetch(urlProfile).then((res) => res.text());
  const $ = cheerio.load(doc);
  const a = $(`a[itemprop="contentUrl"]`)
    .map(function () {
      return `https://unsplash.com${$(this).attr("href")}`;
    })
    .get();
  return a;
};

export const fetchPage = async (url: string) => {
  const data = await fetch(url).then((res) => res.text());
  return data;
};

export const parseDownloadLink = (doc: string) => {
  const $ = cheerio.load(doc);
  const a = $(`a[title="Download photo"]`).attr("href");
  return a;
};

export const downloadPhoto = async (url: string, i: number) => {
  const data = await fetch(url);
  if (!data.ok) {
    logger.error(`Error download`);
  }
  logger.info(`Succes download - ${i}`);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
