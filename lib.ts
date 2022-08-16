import cheerio from "cheerio";
import fetch from "cross-fetch";

export const fetchPage = async (url: string) => {
  const data = await fetch(url).then((res) => res.text());
  return data;
};

export const parseDownloadLink = (doc: string) => {
  const $ = cheerio.load(doc);
  const a = $(`a[title="Download photo"]`).attr("href");
  return a as string;
};

export const downloadPhoto = async (url: string) => {
  const data = await fetch(url);
  if (!data.ok) {
    throw new Error("Download failed");
  }
  console.log("Success downloading");
};
