import { random } from "lodash";
import {
  downloadPhoto,
  fetchPage,
  getAllPhotos,
  parseDownloadLink,
  sleep,
} from "./lib";
import { logger } from "./logger";

const launch = async (url: string) => {
  const randomNumber = random(500, 1000);
  logger.info(`Start download ${randomNumber} times`);

  for (let i = 0; i < randomNumber; i++) {
    const data = await fetchPage(url);

    const a = parseDownloadLink(data);
    if (!a) {
      logger.error("No download link found");
      return;
    }

    await downloadPhoto(a, i);
  }
};

const main = async () => {
  const listPhotos = await getAllPhotos("https://unsplash.com/@zakiego");
  for (const url of listPhotos) {
    logger.info(`Start download ${url}`);
    await launch(url);
  }
};

main();
