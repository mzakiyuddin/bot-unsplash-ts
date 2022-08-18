import cheerio from "cheerio";
import fetch from "cross-fetch";
import { logger } from "./logger";
import * as R from "remeda";

export const getAllPhotos = async (urlProfile: string) => {
  const doc = await fetch(urlProfile).then((res) => res.text());
  const $ = cheerio.load(doc);
  const a = $(`a[itemprop="contentUrl"]`)
    .map(function () {
      return `https://unsplash.com${$(this).attr("href")}`;
    })
    .get();
  return R.uniq(a);
};

export const fetchPage = async (url: string) => {
  const data = await fetch(url).then((res) => res.text());
  return data;
};

export const downloadPhoto = async (url: string) => {
  const data = await fetch(url);
  if (!data.ok) {
    logger.error(`Error download`);
  }
};

export const getIdPhoto = (url: string) => {
  const id = url.split("/")[4];
  return id;
};

export const parseImageLink = (doc: string) => {
  const $ = cheerio.load(doc);
  const data = JSON.parse(
    $(`script[type="application/ld+json"]`).html() as string,
  );
  const imagesLink = data.contentUrl.split("?")[0];
  return imagesLink;
};

export const createDownloadLinkPhoto = async (url: string) => {
  const id = getIdPhoto(url);
  const page = await fetchPage(url);
  const imagesLink = parseImageLink(page);
  return `${imagesLink}?ixlib=rb-1.2.1&dl=m-zakiyuddin-munziri-${id}-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb`;
};
