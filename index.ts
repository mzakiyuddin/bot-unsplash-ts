import {
  createDownloadLinkPhoto,
  downloadPhoto,
  fetchPage,
  getAllPhotos,
} from "./lib";
import { logger } from "./logger";
import { Photos } from "./type";

const launch = async (photos: Photos[], x: number, randomNumber: number) => {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    try {
      await fetchPage(photo.url);
      await downloadPhoto(photo.downloadLink);
      logger.info(
        `Succes download image ${photo.id + 1}/${photos.length} - ${
          x + 1
        }/${randomNumber}`,
      );
    } catch (error) {
      logger.error(error);
    }
  }
};

const main = async () => {
  logger.info("Get all photo");
  const listPhotos = await getAllPhotos("https://unsplash.com/@zakiego");
  logger.info(`Success get ${listPhotos.length} photos`);

  const photos = [] as Photos[];

  for (let i = 0; i < listPhotos.length; i++) {
    try {
      logger.info(`Create download link ${i + 1}/${listPhotos.length}`);
      const downloadLink = await createDownloadLinkPhoto(listPhotos[i]);

      photos.push({
        id: i,
        url: listPhotos[i],
        downloadLink,
      });
    } catch (error) {
      logger.error(error);
      throw new Error();
    }
  }
  logger.info("Success create download link");

  const randomNumber = 1500;
  logger.info(`Will download ${randomNumber} times`);

  for (let i = 0; i < randomNumber; i++) {
    await launch(photos, i, randomNumber);
  }
};

main();
