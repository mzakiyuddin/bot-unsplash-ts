import { random } from "lodash";
import {
  downloadPhoto,
  fetchPage,
  getAllPhotos,
  parseDownloadLink,
} from "./lib";
import { logger } from "./logger";
import { Photos } from "./type";

const launch = async (photos: Photos) => {
  const randomNumber = random(500, 1000);
  logger.info(`Will download ${randomNumber} times`);

  for (let i = 0; i < randomNumber; i++) {
    try {
      const data = await fetchPage(photos.url);

      const a = parseDownloadLink(data);
      if (!a) {
        logger.error("No download link found");
        return;
      }

      await downloadPhoto(a);
      logger.info(
        `Succes download - ${i}/${randomNumber} - image ${photos.index}/${photos.total}`,
      );
    } catch (error) {
      logger.error(error);
    }
  }
};

const main = async () => {
  const listPhotos = await getAllPhotos("https://unsplash.com/@zakiego");

  for (let i = 0; i < listPhotos.length; i++) {
    const photos = { index: i, url: listPhotos[i], total: listPhotos.length };
    logger.info(`Start download ${photos.url}`);
    await launch(photos);
  }
};

main();
