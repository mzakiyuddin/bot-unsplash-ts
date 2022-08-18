import { random } from "lodash";
import {
  createDownloadLinkPhoto,
  downloadPhoto,
  fetchPage,
  getAllPhotos,
} from "./lib";
import { logger } from "./logger";
import { Photos } from "./type";

const launch = async (photos: Photos) => {
  const randomNumber = random(1800, 2000);
  const downloadLink = await createDownloadLinkPhoto(photos.url);

  logger.info(`Will download ${randomNumber} times`);
  logger.info(`Photo url ${photos.url}`);
  logger.info(`Download link ${downloadLink}`);

  for (let i = 0; i < randomNumber; i++) {
    try {
      await fetchPage(photos.url);
      await downloadPhoto(downloadLink);

      logger.info(
        `Succes download - ${i + 1}/${randomNumber} - image ${
          photos.index + 1
        }/${photos.total}`,
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
