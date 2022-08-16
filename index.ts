import fetch from "cross-fetch";
import { random } from "lodash";
import { downloadPhoto, fetchPage, parseDownloadLink } from "./lib";

const launch = async (url: string) => {
  const data = await fetchPage(url);
  const a = parseDownloadLink(data);
  await downloadPhoto(a);
};

const main = async () => {
  const randomNumber = random(51, 100);

  for (let i = 0; i < randomNumber; i++) {
    await launch("https://unsplash.com/photos/osVeNwhlBes");
  }
};

main();
