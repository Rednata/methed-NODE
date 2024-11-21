import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import sharp from 'sharp';

export const resizeImage = async(inputPath, outputPath) => {
  console.log('inputPath: ', inputPath);
  console.log('outputPath: ', outputPath);

  const rStream = createReadStream(inputPath);
  const wStream = createWriteStream(outputPath);

  const imgResize = sharp()
    .resize(400, 400)
    .toFormat('jpeg')

  rStream.pipe(imgResize).pipe(wStream)
};
